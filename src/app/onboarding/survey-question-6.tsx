import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { SurveyOptionCard } from '@/components/SurveyOptionCard';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const options = [
  { label: 'Нет, но к животным отношусь нейтрально', value: 'ok' as const },
  { label: 'Да', value: 'has' as const },
  { label: 'Нет, отношусь негативно', value: 'no' as const }
];

const chipLabels: Record<typeof options[number]['value'], string> = {
  ok: 'Можно с животными',
  has: 'Есть питомец',
  no: 'Без животных'
};

export default function SurveyQuestionSixScreen() {
  const router = useRouter();
  const pets = useOnboardingStore((state) => state.preferences.pets as typeof options[number]['value'] | undefined);
  const updatePreferences = useOnboardingStore((state) => state.updatePreferences);

  return (
    <View className="flex-1 bg-bg px-6 py-12">
      <View className="flex-1 justify-between">
        <View className="items-center gap-6 mt-10">
          <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
          <Text className="text-xl text-text text-center">
            Есть ли у вас домашние животные, с которыми планируете жить?
          </Text>
        </View>
        <View className="mt-8 gap-3">
          {options.map((option) => (
            <SurveyOptionCard
              key={option.value}
              label={option.label}
              selected={pets === option.value}
              onPress={() => updatePreferences({ pets: option.value })}
            />
          ))}
        </View>
        <View className="mt-8 items-center">
          <View className="w-40 h-28 rounded-3xl bg-primary-soft/60 items-center justify-center">
            <Text className="text-sm text-primary">Милый кот</Text>
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2 justify-center mt-6">
          {options.map((option) => (
            <Chip key={option.value} label={chipLabels[option.value]} selected={pets === option.value} />
          ))}
        </View>
      </View>
      <View className="gap-3 mt-8">
        <Button
          label="Следующий вопрос"
          onPress={() => router.push('/onboarding/survey-question-7')}
          disabled={!pets}
        />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}

