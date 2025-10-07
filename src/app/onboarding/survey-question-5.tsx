import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { SurveyOptionCard } from '@/components/SurveyOptionCard';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const options = [
  { label: 'Не люблю убираться', value: 'low' as const },
  { label: 'Отношусь нейтрально', value: 'mid' as const },
  { label: 'Помешан на чистоте', value: 'high' as const }
];

export default function SurveyQuestionFiveScreen() {
  const router = useRouter();
  const cleanliness = useOnboardingStore((state) => state.preferences.cleanliness);
  const updatePreferences = useOnboardingStore((state) => state.updatePreferences);

  return (
    <View className="flex-1 bg-bg px-6 py-12">
      <View className="flex-1 justify-between">
        <View className="items-center gap-6 mt-10">
          <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
          <Text className="text-xl text-text text-center">
            Можете ли вы назвать себя чистюлей?
          </Text>
        </View>
        <View className="mt-8 gap-3">
          {options.map((option) => (
            <SurveyOptionCard
              key={option.value}
              label={option.label}
              selected={cleanliness === option.value}
              onPress={() => updatePreferences({ cleanliness: option.value })}
            />
          ))}
        </View>
        <View className="mt-8 items-center">
          <View className="w-40 h-28 rounded-3xl bg-primary-soft/60 items-center justify-center">
            <Text className="text-sm text-primary">Иллюстрация</Text>
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2 justify-center mt-6">
          {options.map((option) => (
            <Chip key={option.value} label={option.label} selected={cleanliness === option.value} />
          ))}
        </View>
      </View>
      <View className="gap-3 mt-8">
        <Button
          label="Следующий вопрос"
          onPress={() => router.push('/onboarding/survey-question-6')}
          disabled={!cleanliness}
        />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}

