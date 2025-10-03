import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { ListingPreview } from '@/components/ListingPreview';
import { usePublishStore } from '@/store/usePublishStore';
import { publishConditionsSchema } from '@/lib/validation';
import { supabase } from '@/lib/supabase';
import { useProfile } from '@/hooks/useProfile';

const alcoholOptions = [
  { value: 'no', label: 'Не употребляю' },
  { value: 'rare', label: 'Редко' },
  { value: 'social', label: 'По праздникам' }
] as const;

const cleanlinessOptions = [
  { value: 'low', label: 'Лайтово' },
  { value: 'mid', label: 'Средне' },
  { value: 'high', label: 'Строго' }
] as const;

const sleepOptions = [
  { value: 'early', label: 'Жаворонок' },
  { value: 'flex', label: 'Гибкий' },
  { value: 'late', label: 'Сова' }
] as const;

export default function PublishConditionsScreen() {
  const router = useRouter();
  const { details, images, conditions, setConditions, reset } = usePublishStore();
  const { data: profile } = useProfile();
  const [localConditions, setLocalConditions] = useState({
    furnished: conditions.furnished ?? true,
    petsAllowed: conditions.petsAllowed ?? false,
    smokingAllowed: conditions.smokingAllowed ?? false,
    alcohol: conditions.alcohol ?? 'social',
    cleanliness: conditions.cleanliness ?? 'mid',
    sleep: conditions.sleep ?? 'flex'
  });
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    const parsed = publishConditionsSchema.safeParse(localConditions);
    if (!parsed.success) {
      Alert.alert('Заполните условия', parsed.error.issues[0]?.message ?? '');
      return;
    }
    if (!profile?.verified) {
      Alert.alert('Требуется верификация', 'Подтвердите статус студента, чтобы публиковать комнату.');
      return;
    }

    if (!details?.title) {
      Alert.alert('Заполните детали', 'Вернитесь и опишите объявление.');
      router.replace('/publish');
      return;
    }

    try {
      setLoading(true);
      setConditions(parsed.data);
      const { data, error } = await supabase
        .from('listings')
        .insert({
          title: details.title,
          description: details.description,
          price: details.price,
          address: details.address,
          minutes_to_campus: details.minutesToCampus,
          roommates_count: details.roommatesCount,
          owner_id: profile.id,
          features: {
            furnished: parsed.data.furnished,
            pets: parsed.data.petsAllowed,
            smoking: parsed.data.smokingAllowed,
            alcohol: parsed.data.alcohol,
            cleanliness: parsed.data.cleanliness,
            sleep: parsed.data.sleep
          }
        })
        .select()
        .single();
      if (error) throw error;
      if (images?.length) {
        const { error: imageError } = await supabase
          .from('listing_images')
          .insert(images.map((url, index) => ({ listing_id: data.id, url, sort: index })));
        if (imageError) throw imageError;
      }
      reset();
      Alert.alert('Готово', 'Объявление отправлено на модерацию.');
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Не удалось опубликовать', 'Попробуйте снова позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="bg-surface rounded-3xl p-4 gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-text">С мебелью</Text>
          <Switch
            value={localConditions.furnished}
            onValueChange={(furnished) => setLocalConditions((prev) => ({ ...prev, furnished }))}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-text">Можно с животными</Text>
          <Switch
            value={localConditions.petsAllowed}
            onValueChange={(petsAllowed) => setLocalConditions((prev) => ({ ...prev, petsAllowed }))}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-text">Курение</Text>
          <Switch
            value={localConditions.smokingAllowed}
            onValueChange={(smokingAllowed) =>
              setLocalConditions((prev) => ({ ...prev, smokingAllowed }))
            }
          />
        </View>
      </View>

      <View className="bg-surface rounded-3xl p-4 gap-3">
        <Text className="text-base text-text">Алкоголь</Text>
        <View className="flex-row flex-wrap gap-2">
          {alcoholOptions.map((option) => (
            <Button
              key={option.value}
              label={option.label}
              variant={localConditions.alcohol === option.value ? 'primary' : 'outline'}
              onPress={() => setLocalConditions((prev) => ({ ...prev, alcohol: option.value }))}
            />
          ))}
        </View>
      </View>

      <View className="bg-surface rounded-3xl p-4 gap-3">
        <Text className="text-base text-text">Чистота</Text>
        <View className="flex-row flex-wrap gap-2">
          {cleanlinessOptions.map((option) => (
            <Button
              key={option.value}
              label={option.label}
              variant={localConditions.cleanliness === option.value ? 'primary' : 'outline'}
              onPress={() => setLocalConditions((prev) => ({ ...prev, cleanliness: option.value }))}
            />
          ))}
        </View>
      </View>

      <View className="bg-surface rounded-3xl p-4 gap-3">
        <Text className="text-base text-text">Сон</Text>
        <View className="flex-row flex-wrap gap-2">
          {sleepOptions.map((option) => (
            <Button
              key={option.value}
              label={option.label}
              variant={localConditions.sleep === option.value ? 'primary' : 'outline'}
              onPress={() => setLocalConditions((prev) => ({ ...prev, sleep: option.value }))}
            />
          ))}
        </View>
      </View>

      <ListingPreview details={details} images={images} conditions={localConditions} />

      <Button label="Опубликовать" onPress={handleComplete} loading={loading} />
    </ScrollView>
  );
}
