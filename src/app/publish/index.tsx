import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { ListingPreview } from '@/components/ListingPreview';
import { usePublishStore } from '@/store/usePublishStore';
import { publishDetailsSchema } from '@/lib/validation';

export default function PublishDetailsScreen() {
  const router = useRouter();
  const { details, setDetails } = usePublishStore();
  const [localDetails, setLocalDetails] = useState({
    title: details.title ?? '',
    description: details.description ?? '',
    price: details.price?.toString() ?? '',
    address: details.address ?? '',
    minutesToCampus: details.minutesToCampus?.toString() ?? '',
    roommatesCount: details.roommatesCount?.toString() ?? ''
  });

  const handleNext = () => {
    const parsed = publishDetailsSchema.safeParse({
      title: localDetails.title,
      description: localDetails.description,
      price: Number(localDetails.price),
      address: localDetails.address,
      minutesToCampus: Number(localDetails.minutesToCampus),
      roommatesCount: Number(localDetails.roommatesCount)
    });

    if (!parsed.success) {
      Alert.alert('Проверьте поля', parsed.error.issues[0]?.message ?? 'Заполните форму');
      return;
    }

    setDetails(parsed.data);
    router.push('/publish/photos');
  };

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="gap-3">
        <Text className="text-2xl font-semibold text-text">Опишите комнату</Text>
        <TextInput
          placeholder="Заголовок"
          value={localDetails.title}
          onChangeText={(title) => setLocalDetails((prev) => ({ ...prev, title }))}
          className="bg-surface border border-border rounded-2xl px-4 py-3"
        />
        <TextInput
          placeholder="Описание"
          multiline
          numberOfLines={4}
          value={localDetails.description}
          onChangeText={(description) => setLocalDetails((prev) => ({ ...prev, description }))}
          className="bg-surface border border-border rounded-2xl px-4 py-3"
        />
        <TextInput
          placeholder="Стоимость, ₽"
          keyboardType="numeric"
          value={localDetails.price}
          onChangeText={(price) => setLocalDetails((prev) => ({ ...prev, price }))}
          className="bg-surface border border-border rounded-2xl px-4 py-3"
        />
        <TextInput
          placeholder="Адрес"
          value={localDetails.address}
          onChangeText={(address) => setLocalDetails((prev) => ({ ...prev, address }))}
          className="bg-surface border border-border rounded-2xl px-4 py-3"
        />
        <TextInput
          placeholder="Минут до кампуса"
          keyboardType="numeric"
          value={localDetails.minutesToCampus}
          onChangeText={(minutesToCampus) =>
            setLocalDetails((prev) => ({ ...prev, minutesToCampus }))
          }
          className="bg-surface border border-border rounded-2xl px-4 py-3"
        />
        <TextInput
          placeholder="Сколько соседей"
          keyboardType="numeric"
          value={localDetails.roommatesCount}
          onChangeText={(roommatesCount) =>
            setLocalDetails((prev) => ({ ...prev, roommatesCount }))
          }
          className="bg-surface border border-border rounded-2xl px-4 py-3"
        />
      </View>

      <ListingPreview details={{
        title: localDetails.title,
        description: localDetails.description,
        price: Number(localDetails.price) || 0,
        address: localDetails.address,
        minutesToCampus: Number(localDetails.minutesToCampus) || 0,
        roommatesCount: Number(localDetails.roommatesCount) || 0
      }} />

      <Button label="Далее" onPress={handleNext} />
    </ScrollView>
  );
}
