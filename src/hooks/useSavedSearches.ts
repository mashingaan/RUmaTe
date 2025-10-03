import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

type SavedSearch = {
  id: string;
  query_json: unknown;
};

export const useSavedSearches = () =>
  useQuery({
    queryKey: ['saved-searches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_searches')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as SavedSearch[];
    }
  });
