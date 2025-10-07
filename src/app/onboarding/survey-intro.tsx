import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';

export default function SurveyIntroScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between items-center">
      <View className="items-center gap-4 mt-16">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text style={[typography.h1, { color: colors.text }]}>Опрос</Text>
        <Text className="text-base text-text-muted text-center">
          Пройдите короткий опрос о ваших предпочтениях, и мы добавим ответы в вашу анкету.
        </Text>
      </View>
      <Button label="Продолжить" onPress={() => router.push('/onboarding/survey-question-1')} />
    </View>
  );
}
