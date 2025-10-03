import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { colors, radii } from '@/constants/theme';
import type { Listing } from '@/types/listing';
import { Button } from './Button';
import { Chip } from './Chip';
import { Share2, Star } from 'lucide-react-native';

interface ListingCardProps {
  listing: Listing;
  onPress?: () => void;
  onContact?: () => void;
  onToggleFavorite?: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onPress,
  onContact,
  onToggleFavorite
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{ backgroundColor: colors.surface, borderRadius: radii.md, padding: 16, gap: 12 }}
    >
      <View className="w-full aspect-video overflow-hidden rounded-xl bg-primary-soft">
        {listing.images?.[0] ? (
          <Image source={{ uri: listing.images[0] }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-text-muted">Фото скоро появится</Text>
          </View>
        )}
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-semibold text-text">{listing.price.toLocaleString()} ₽</Text>
        <Chip label={`${listing.compatibility_index}%`} selected />
      </View>
      <Text className="text-base font-medium text-text" numberOfLines={1}>
        {listing.title}
      </Text>
      <Text className="text-sm text-text-muted" numberOfLines={2}>
        {listing.minutes_to_campus} мин до кампуса • {listing.roommates_count} сосед(ов)
      </Text>
      <View className="flex-row gap-2 flex-wrap">
        {listing.features?.furnished && <Chip label="Мебель" />}
        {listing.features?.pets && <Chip label="Животные" />}
        {listing.features?.smoking && <Chip label="Курение" />}
      </View>
      <View className="flex-row justify-between items-center">
        <Button label="Связаться" onPress={onContact} className="flex-1" />
        <View className="flex-row gap-3 ml-4">
          <Pressable accessibilityRole="button" onPress={onToggleFavorite} className="p-2">
            <Star color={colors.iconMuted} size={22} />
          </Pressable>
          <Pressable accessibilityRole="button" className="p-2">
            <Share2 color={colors.iconMuted} size={22} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
