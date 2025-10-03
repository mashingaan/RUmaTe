import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';

export default function SettingsScreen() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleDeactivate = () => {
    if (!profile?.id) return;
    Alert.alert('Деактивировать аккаунт', 'Вы сможете вернуться позже.', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Деактивировать',
        style: 'destructive',
        onPress: () =>
          updateProfile.mutate({ id: profile.id, is_active: false }, {
            onSuccess: () => {
              void supabase.from('listings').update({ is_active: false }).eq('owner_id', profile.id);
            }
          })
      }
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 16 }}>
      <View className="bg-surface rounded-3xl p-4 gap-4">
        <Text className="text-lg font-semibold text-text">Аккаунт</Text>
        <Button label="Выйти" variant="outline" onPress={handleLogout} />
        <Button label="Деактивировать аккаунт" variant="danger" onPress={handleDeactivate} />
      </View>
    </ScrollView>
  );
}
