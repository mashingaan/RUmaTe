import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, supabaseRealtimeChannel } from '@/lib/supabase';
import type { Message, Thread } from '@/types/chat';
import { useEffect } from 'react';

const THREADS_KEY = ['threads'];
const MESSAGES_KEY = (threadId: string) => ['messages', threadId];

export const useThreads = () => {
  const query = useQuery({
    queryKey: THREADS_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threads')
        .select('*, listings(title)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []).map((thread) => ({
        ...thread,
        listing_title: thread.listings?.title
      })) as Thread[];
    }
  });

  useEffect(() => {
    const channel = supabaseRealtimeChannel('threads');
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'threads' }, () => {
      void query.refetch();
    });
    channel.subscribe();
    return () => {
      void channel.unsubscribe();
    };
  }, [query]);

  return query;
};

export const useMessages = (threadId: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: MESSAGES_KEY(threadId),
    queryFn: async () => {
      if (!threadId) return [] as Message[];
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data as Message[];
    },
    enabled: Boolean(threadId)
  });

  useEffect(() => {
    if (!threadId) return;
    const channel = supabaseRealtimeChannel(`messages-${threadId}`);
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'messages', filter: `thread_id=eq.${threadId}` },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          queryClient.setQueryData<Message[]>(MESSAGES_KEY(threadId), (messages = []) => [
            ...(messages ?? []),
            payload.new as Message
          ]);
        }
      }
    );
    channel.subscribe();
    return () => {
      void channel.unsubscribe();
    };
  }, [queryClient, threadId]);

  return query;
};

export const useSendMessage = (threadId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: Pick<Message, 'text' | 'sender_id'>) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({ ...message, thread_id: threadId })
        .select()
        .single();
      if (error) throw error;
      return data as Message;
    },
    onMutate: async (message) => {
      await queryClient.cancelQueries({ queryKey: MESSAGES_KEY(threadId) });
      const previous = queryClient.getQueryData<Message[]>(MESSAGES_KEY(threadId)) ?? [];
      const optimisticMessage: Message = {
        id: `optimistic-${Date.now()}`,
        thread_id: threadId,
        text: message.text,
        sender_id: message.sender_id,
        created_at: new Date().toISOString()
      };
      queryClient.setQueryData<Message[]>(MESSAGES_KEY(threadId), [...previous, optimisticMessage]);
      return previous;
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData<Message[]>(MESSAGES_KEY(threadId), context as Message[]);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: MESSAGES_KEY(threadId) });
    }
  });
};
