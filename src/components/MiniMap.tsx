import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import type { Listing } from '@/types/listing';
import { View } from 'react-native';

interface MiniMapProps {
  listings: Listing[];
  onSelect?: (listing: Listing) => void;
}

export const MiniMap: React.FC<MiniMapProps> = ({ listings, onSelect }) => {
  const defaultRegion = {
    latitude: listings[0]?.lat ?? 55.751244,
    longitude: listings[0]?.lng ?? 37.618423,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  };

  return (
    <View className="overflow-hidden rounded-2xl border border-border" style={{ height: '30%' }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={defaultRegion}
        accessibilityLabel="Карта объявлений"
      >
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            coordinate={{ latitude: listing.lat, longitude: listing.lng }}
            title={listing.title}
            description={`${listing.price.toLocaleString()} ₽`}
            onPress={() => onSelect?.(listing)}
          />
        ))}
      </MapView>
    </View>
  );
};
