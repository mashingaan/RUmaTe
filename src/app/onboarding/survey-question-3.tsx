import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';

const marks = ['10-20 тыс. руб.', '20-40 тыс. руб.', 'более 40 тыс. руб.'];

export default function SurveyQuestionThreeScreen() {
  const router = useRouter();
  const [value, setValue] = React.useState(1);

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-8 mt-16">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text className="text-xl text-text text-center">
          Какую сумму вы готовы потратить на съём жилья?
        </Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={marks.length - 1}
          step={1}
          minimumTrackTintColor={colors.primary}
          thumbTintColor={colors.primary}
          value={value}
          onValueChange={(val) => setValue(val)}
        />
        <View className="flex-row gap-2">
          {marks.map((mark, index) => (
            <Text
              key={mark}
              className={`px-3 py-2 rounded-full border ${index === value ? 'bg-primary-soft border-primary text-primary' : 'border-border text-text-muted'}`}
            >
              {mark}
            </Text>
          ))}
        </View>
      </View>
      <View className="gap-3">
        <Button label="Следующий вопрос" onPress={() => router.push('/onboarding/survey-question-4')} />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
