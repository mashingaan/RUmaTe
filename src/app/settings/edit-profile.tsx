import React from 'react';
import { View, Text } from 'react-native';
import { colors, typography } from '@/constants/theme';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';

export default function EditProfileIntroScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-8 mt-16">
        <View className="w-24 h-24 rounded-full bg-primary-soft items-center justify-center">
          <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        </View>
        <View className="items-center gap-4">
          <Text style={[typography.h1, { color: colors.text, textAlign: 'center' }]}>Редактирование профиля</Text>
          <Text className="text-base text-text-muted text-center">
            Отредактируйте свои ответы из первичного опроса или добавьте дополнительную информацию.
          </Text>
        </View>
      </View>
      <Button label="Продолжить" onPress={() => router.push('/onboarding/survey-intro')} />
    </View>
  );
}

