import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';

export default function SurveyQuestionFourScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-16">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text className="text-xl text-text text-center">
          Есть ли у вас уже вариант для съёма жилья?
        </Text>
        <View className="flex-row gap-3">
          <Button label="Да" variant="outline" onPress={() => router.push('/onboarding/survey-question-4-yes')} />
          <Button label="Нет" variant="outline" onPress={() => router.push('/onboarding/survey-question-3')} />
        </View>
      </View>
      <View className="gap-3">
        <Button label="Следующий вопрос" onPress={() => router.push('/home')} />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
