import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, typography } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Alert.alert('До встречи!', 'Вы вышли из аккаунта.');
  };

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="items-center gap-2">
        <Text style={[typography.h1, { color: colors.text }]}>Настройки</Text>
        <Text className="text-sm text-text-muted text-center">
          Управляйте аккаунтом и расскажите нам о проблемах.
        </Text>
      </View>

      <View className="bg-surface rounded-4xl p-6 gap-4">
        <Button label="Выйти из аккаунта" onPress={handleLogout} />
        <Button
          label="Деактивировать аккаунт"
          variant="danger"
          onPress={() => router.push('/settings/deactivate')}
        />
        <Button
          label="Сообщить об ошибках"
          variant="outline"
          onPress={() => router.push('/settings/report-issue')}
        />
        <Button
          label="Редактировать профиль"
          variant="outline"
          onPress={() => router.push('/settings/edit-profile')}
        />
      </View>
    </ScrollView>
  );
}
