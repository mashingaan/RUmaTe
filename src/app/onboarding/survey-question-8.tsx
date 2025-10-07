import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { SurveyOptionCard } from '@/components/SurveyOptionCard';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const options = [
  { label: 'Нет, но отношусь к курению нейтрально', value: 'neutral' as const },
  { label: 'Да', value: 'positive' as const },
  { label: 'Нет, отношусь негативно', value: 'negative' as const }
];

const chipLabels: Record<typeof options[number]['value'], string> = {
  neutral: 'Нейтрален к курению',
  positive: 'Положительное отношение к курению',
  negative: 'Негативное отношение к курению'
};

export default function SurveyQuestionEightScreen() {
  const router = useRouter();
  const smoking = useOnboardingStore((state) => state.preferences.smoking as typeof options[number]['value'] | undefined);
  const updatePreferences = useOnboardingStore((state) => state.updatePreferences);

  const handleFinish = () => {
    router.push('/(tabs)/matches');
  };

  const handleSkip = () => {
    updatePreferences({ smoking: undefined });
    handleFinish();
  };

  return (
    <View className="flex-1 bg-bg px-6 py-12">
      <View className="flex-1 justify-between">
        <View className="items-center gap-6 mt-10">
          <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
          <Text className="text-xl text-text text-center">Курите ли вы?</Text>
        </View>
        <View className="mt-8 gap-3">
          {options.map((option) => (
            <SurveyOptionCard
              key={option.value}
              label={option.label}
              selected={smoking === option.value}
              onPress={() => updatePreferences({ smoking: option.value })}
            />
          ))}
        </View>
        <View className="mt-8 items-center">
          <View className="w-40 h-28 rounded-3xl bg-primary-soft/60 items-center justify-center">
            <Text className="text-sm text-primary">Дым без дыма</Text>
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2 justify-center mt-6">
          {options.map((option) => (
            <Chip key={option.value} label={chipLabels[option.value]} selected={smoking === option.value} />
          ))}
        </View>
      </View>
      <View className="gap-3 mt-8">
        <Button label="Завершить" onPress={handleFinish} disabled={!smoking} />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
        <Button label="Пропустить вопрос" variant="ghost" onPress={handleSkip} />
      </View>
    </View>
  );
}

