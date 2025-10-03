
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Listing } from '@/types/listing';

type ListingWithImages = Partial<Listing> & { images?: string[] | null };

type MatchRow = {
  id: string;
  compatibility_index: number | null;
  listings: ListingWithImages | null;
};

export type Match = {
  id: string;
  compatibility_index: number;
  listing: Listing;
};

const toListing = (payload: ListingWithImages | null): Listing => ({
  id: payload?.id ?? '',
  title: payload?.title ?? '',
  description: payload?.description ?? '',
  price: payload?.price ?? 0,
  address: payload?.address ?? '',
  lat: payload?.lat ?? 0,
  lng: payload?.lng ?? 0,
  minutes_to_campus: payload?.minutes_to_campus ?? 0,
  roommates_count: payload?.roommates_count ?? 0,
  features: (payload?.features ?? {}) as Listing['features'],
  compatibility_index: payload?.compatibility_index ?? 0,
  images: payload?.images ?? [],
  owner_id: payload?.owner_id ?? ''
});

export const useMatches = () =>
  useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: async (): Promise<Match[]> => {
      const { data, error } = await supabase
        .from('matches')
        .select('id, compatibility_index, listings(*)')
        .order('compatibility_index', { ascending: false });
      if (error) throw error;
      const rows = (data as MatchRow[] | null) ?? [];
      return rows.map((item) => ({
        id: item.id,
        compatibility_index: item.compatibility_index ?? 0,
        listing: toListing(item.listings)
      }));
    }
  });
