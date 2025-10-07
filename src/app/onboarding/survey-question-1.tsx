import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';

export default function SurveyQuestionOneScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-16">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text style={[typography.h1, { color: colors.text, textAlign: 'center' }]}>Есть ли у вас уже пара, с кем вы хотите снимать жильё?</Text>
        <View className="flex-row gap-3">
          <Button label="Да" variant="outline" onPress={() => router.push('/onboarding/survey-question-1-yes')} />
          <Button label="Нет" variant="outline" onPress={() => router.push('/onboarding/survey-question-1-no')} />
        </View>
      </View>
      <Button label="Следующий вопрос" onPress={() => router.push('/onboarding/survey-question-3')} />
    </View>
  );
}
