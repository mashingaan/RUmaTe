import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Listing } from '@/types/listing';

type Match = {
  id: string;
  compatibility_index: number;
  listing: Listing;
};

export const useMatches = () =>
  useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('id, compatibility_index, listings(*)')
        .order('compatibility_index', { ascending: false });
      if (error) throw error;
      return (data ?? []).map((item) => ({
        id: item.id,
        compatibility_index: item.compatibility_index ?? 0,
        listing: {
          ...(item.listings ?? {}),
          images: item.listings?.images ?? []
        } as Listing
      })) as Match[];
    }
  });
