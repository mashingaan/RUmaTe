import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';

const options = ['1', '2', '3 и более'];

export default function SurveyQuestionOneYesScreen() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-16">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text className="text-xl text-text text-center">
          Со сколькими людьми вы планируете снимать жильё (не считая вас и вашу пару)?
        </Text>
        <View className="flex-row gap-3">
          {options.map((option) => (
            <Button
              key={option}
              label={option}
              variant={selected === option ? 'primary' : 'outline'}
              onPress={() => setSelected(option)}
            />
          ))}
        </View>
      </View>
      <View className="gap-3">
        <Button label="Следующий вопрос" onPress={() => router.push('/onboarding/survey-question-3')} disabled={!selected} />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
