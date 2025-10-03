import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/profile';

export const PROFILE_KEY = ['profile'];

export const useProfile = () =>
  useQuery({
    queryKey: PROFILE_KEY,
    queryFn: async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*, preferences(*)')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data as Profile;
    }
  });

export const useUpdateProfile = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', payload.id)
        .select()
        .single();
      if (error) throw error;
      return data as Profile;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: PROFILE_KEY });
    }
  });
};
