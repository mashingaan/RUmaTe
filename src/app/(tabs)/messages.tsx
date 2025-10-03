import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useThreads, useMessages, useSendMessage } from '@/hooks/useThreads';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { useAuth } from '@/hooks/useAuth';
import { messageSchema } from '@/lib/validation';

const quickReplies = [
  'Здравствуйте! Готов(а) подъехать сегодня в 18:00.',
  'Добрый день! Подскажите, свободна ли комната?',
  'Привет! Можно обсудить детали проживания?'
];

export default function MessagesScreen() {
  const { data: threads, isLoading: threadsLoading, isError, refetch } = useThreads();
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const { session } = useAuth();
  const activeThreadId = selectedThreadId ?? threads?.[0]?.id;
  const messagesQuery = useMessages(activeThreadId ?? '');
  const sendMessage = useSendMessage(activeThreadId ?? '');
  const [text, setText] = useState('');

  const handleSend = () => {
    const parsed = messageSchema.safeParse({ text });
    if (!parsed.success || !activeThreadId || !session?.user) return;
    sendMessage.mutate({ text: parsed.data.text, sender_id: session.user.id });
    setText('');
  };

  return (
    <View className="flex-1 bg-bg">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-semibold text-text">Сообщения</Text>
      </View>
      {threadsLoading && (
        <View className="px-4 gap-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={72} />
          ))}
        </View>
      )}
      {!threadsLoading && !threads?.length && (
        <EmptyState
          title="Чаты появятся здесь"
          description="Свяжитесь с хозяином комнаты, чтобы продолжить диалог"
        />
      )}
      <FlatList
        horizontal
        data={threads ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Chip
            label={item.listing_title ?? 'Объявление'}
            selected={item.id === activeThreadId}
            onPress={() => setSelectedThreadId(item.id)}
          />
        )}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
        style={{ maxHeight: 56, paddingVertical: 8 }}
        showsHorizontalScrollIndicator={false}
      />
      <View className="flex-1 px-4">
        {isError && (
          <EmptyState
            title="Не удалось загрузить сообщения"
            actionLabel="Повторить"
            onActionPress={() => void refetch()}
          />
        )}
        {!isError && (
          <FlatList
            data={messagesQuery.data ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 my-2 ${
                  item.sender_id === session?.user?.id ? 'self-end bg-primary' : 'self-start bg-surface'
                }`}
              >
                <Text className={item.sender_id === session?.user?.id ? 'text-white' : 'text-text'}>
                  {item.text}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingVertical: 16, gap: 4 }}
          />
        )}
      </View>
      <View className="px-4 pb-6 gap-3">
        <FlatList
          horizontal
          data={quickReplies}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Chip label={item} onPress={() => setText(item)} />
          )}
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
        />
        <View className="bg-surface rounded-3xl border border-border px-4 py-3 flex-row items-center gap-3">
          <TextInput
            placeholder="Сообщение"
            value={text}
            onChangeText={setText}
            style={{ flex: 1 }}
          />
          <Button
            label="Отправить"
            variant="primary"
            onPress={handleSend}
            disabled={!text}
            loading={sendMessage.isLoading}
          />
        </View>
      </View>
    </View>
  );
}
