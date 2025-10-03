import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Listing } from '@/types/listing';
import { useSearchStore } from '@/store/useSearchStore';

const LISTINGS_KEY = ['listings'];

const mapListing = (payload: any): Listing => ({
  id: payload.id,
  title: payload.title,
  description: payload.description,
  price: payload.price,
  address: payload.address,
  lat: payload.lat,
  lng: payload.lng,
  minutes_to_campus: payload.minutes_to_campus,
  roommates_count: payload.roommates_count ?? 0,
  features: payload.features ?? {},
  compatibility_index: payload.compatibility_index ?? 0,
  images: payload.images ?? [],
  owner_id: payload.owner_id
});

export const useListings = () => {
  const filters = useSearchStore((state) => state.filters);
  const query = useSearchStore((state) => state.query);

  return useQuery({
    queryKey: [...LISTINGS_KEY, filters, query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings_view')
        .select('*')
        .eq('is_active', true)
        .limit(50);
      if (error) throw error;
      return (data ?? []).map(mapListing);
    }
  });
};

export const useToggleSaveSearch = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id?: string; query_json: unknown }) => {
      if (payload.id) {
        const { error } = await supabase.from('saved_searches').delete().eq('id', payload.id);
        if (error) throw error;
        return null;
      }
      const { data, error } = await supabase
        .from('saved_searches')
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: ['saved-searches'] });
    }
  });
};
