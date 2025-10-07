import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';

export default function DeactivateAccountScreen() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const isLoading = updateProfile.status === 'pending';

  const handleConfirm = () => {
    if (!profile?.id) {
      Alert.alert('Не удалось деактивировать', 'Профиль не найден.');
      return;
    }
    updateProfile.mutate(
      { id: profile.id, is_active: false },
      {
        onSuccess: () => {
          void supabase.from('listings').update({ is_active: false }).eq('owner_id', profile.id);
          Alert.alert('Профиль деактивирован', 'Вы всегда сможете вернуться.');
          router.back();
        },
        onError: () => {
          Alert.alert('Не удалось деактивировать', 'Попробуйте снова позже.');
        }
      }
    );
  };

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-8 mt-16">
        <Text style={[typography.h1, { color: colors.text, textAlign: 'center' }]}>
          Ваш аккаунт будет удален и не будет отображаться другим пользователям.
        </Text>
        <Text className="text-base text-text-muted text-center">
          Вы действительно хотите деактивировать аккаунт?
        </Text>
      </View>
      <View className="flex-row gap-3">
        <Button label="Да" onPress={handleConfirm} loading={isLoading} className="flex-1" />
        <Button label="Нет" variant="outline" className="flex-1" onPress={() => router.back()} />
      </View>
    </View>
  );
}

