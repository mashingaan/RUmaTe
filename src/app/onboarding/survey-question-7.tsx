import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { SurveyOptionCard } from '@/components/SurveyOptionCard';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const options = [
  { label: 'Нет, но отношусь к алкоголю нейтрально', value: 'neutral' as const },
  { label: 'Да', value: 'positive' as const },
  { label: 'Нет, отношусь негативно', value: 'negative' as const }
];

const chipLabels: Record<typeof options[number]['value'], string> = {
  neutral: 'Нейтрален к алкоголю',
  positive: 'Положительное отношение к алкоголю',
  negative: 'Негативное отношение к алкоголю'
};

export default function SurveyQuestionSevenScreen() {
  const router = useRouter();
  const alcohol = useOnboardingStore((state) => state.preferences.alcohol as typeof options[number]['value'] | undefined);
  const updatePreferences = useOnboardingStore((state) => state.updatePreferences);

  const handleNext = () => {
    router.push('/onboarding/survey-question-8');
  };

  const handleSkip = () => {
    updatePreferences({ alcohol: undefined });
    handleNext();
  };

  return (
    <View className="flex-1 bg-bg px-6 py-12">
      <View className="flex-1 justify-between">
        <View className="items-center gap-6 mt-10">
          <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
          <Text className="text-xl text-text text-center">Употребляете ли вы алкоголь?</Text>
        </View>
        <View className="mt-8 gap-3">
          {options.map((option) => (
            <SurveyOptionCard
              key={option.value}
              label={option.label}
              selected={alcohol === option.value}
              onPress={() => updatePreferences({ alcohol: option.value })}
            />
          ))}
        </View>
        <View className="mt-8 items-center">
          <View className="w-40 h-28 rounded-3xl bg-primary-soft/60 items-center justify-center">
            <Text className="text-sm text-primary">Пузырьки</Text>
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2 justify-center mt-6">
          {options.map((option) => (
            <Chip key={option.value} label={chipLabels[option.value]} selected={alcohol === option.value} />
          ))}
        </View>
      </View>
      <View className="gap-3 mt-8">
        <Button label="Следующий вопрос" onPress={handleNext} disabled={!alcohol} />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
        <Button label="Пропустить вопрос" variant="ghost" onPress={handleSkip} />
      </View>
    </View>
  );
}

