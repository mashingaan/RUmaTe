import React from 'react';
import { Text, View } from 'react-native';
import type { PublishConditionsForm, PublishDetailsForm } from '@/lib/validation';

interface ListingPreviewProps {
  details?: Partial<PublishDetailsForm>;
  conditions?: Partial<PublishConditionsForm>;
  images?: string[];
}

export const ListingPreview: React.FC<ListingPreviewProps> = ({ details, conditions, images }) => (
  <View className="bg-surface border border-border rounded-3xl p-4 gap-3">
    <Text className="text-lg font-semibold text-text">РџСЂРµРІСЊСЋ РєР°СЂС‚РѕС‡РєРё</Text>
    <Text className="text-2xl font-semibold text-text">
      {details?.price ? `${details.price.toLocaleString()} в‚Ѕ` : 'Р¦РµРЅР°'}
    </Text>
    <Text className="text-base text-text" numberOfLines={2}>
      {details?.title ?? 'РќР°Р·РІР°РЅРёРµ РєРѕРјРЅР°С‚С‹'}
    </Text>
    <Text className="text-sm text-text-muted" numberOfLines={3}>
      {details?.description ?? 'РћРїРёСЃР°РЅРёРµ РїРѕСЏРІРёС‚СЃСЏ Р·РґРµСЃСЊ'}
    </Text>
    <Text className="text-sm text-text-muted">
      {conditions?.furnished ? 'РЎ РјРµР±РµР»СЊСЋ вЂў ' : ''}
      {conditions?.petsAllowed ? 'РњРѕР¶РЅРѕ СЃ Р¶РёРІРѕС‚РЅС‹РјРё вЂў ' : ''}
      {conditions?.smokingAllowed ? 'РњРѕР¶РЅРѕ РєСѓСЂРёС‚СЊ' : 'Р‘РµР· РєСѓСЂРµРЅРёСЏ'}
    </Text>
    <Text className="text-xs text-text-muted">
      Р¤РѕС‚Рѕ: {images?.length ? `${images.length} С€С‚.` : 'РЅРµ РґРѕР±Р°РІР»РµРЅС‹'}
    </Text>
  </View>
);

