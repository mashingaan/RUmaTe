import React from 'react';
import { Text, View } from 'react-native';
import type { PublishConditionsForm, PublishDetailsForm } from '@/lib/validation';
import { colors } from '@/constants/theme';

interface ListingPreviewProps {
  details?: Partial<PublishDetailsForm>;
  conditions?: Partial<PublishConditionsForm>;
  images?: string[];
}

export const ListingPreview: React.FC<ListingPreviewProps> = ({ details, conditions, images }) => (
  <View className="bg-surface border border-border rounded-3xl p-4 gap-3">
    <Text className="text-lg font-semibold text-text">Превью карточки</Text>
    <Text className="text-2xl font-semibold text-text">
      {details?.price ? `${details.price.toLocaleString()} ₽` : 'Цена'}
    </Text>
    <Text className="text-base text-text" numberOfLines={2}>
      {details?.title ?? 'Название комнаты'}
    </Text>
    <Text className="text-sm text-text-muted" numberOfLines={3}>
      {details?.description ?? 'Описание появится здесь'}
    </Text>
    <Text className="text-sm text-text-muted">
      {conditions?.furnished ? 'С мебелью • ' : ''}
      {conditions?.petsAllowed ? 'Можно с животными • ' : ''}
      {conditions?.smokingAllowed ? 'Можно курить' : 'Без курения'}
    </Text>
    <Text className="text-xs text-text-muted">
      Фото: {images?.length ? `${images.length} шт.` : 'не добавлены'}
    </Text>
  </View>
);
