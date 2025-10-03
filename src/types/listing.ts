export type ListingFeature = 'furnished' | 'pets' | 'smoking' | 'roommates';

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  lat: number;
  lng: number;
  minutes_to_campus: number;
  roommates_count: number;
  features: Partial<Record<ListingFeature, boolean>>;
  compatibility_index: number;
  images: string[];
  owner_id: string;
};
