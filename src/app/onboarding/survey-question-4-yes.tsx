import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';

export default function SurveyQuestionFourYesScreen() {
  const router = useRouter();
  const [link, setLink] = React.useState('');

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-16">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text className="text-xl text-text text-center">Введите ссылку на жильё:</Text>
        <TextInput
          value={link}
          onChangeText={setLink}
          placeholder="Поле для ссылки"
          className="bg-surface rounded-full px-5 py-4 border border-border text-base w-full"
          placeholderTextColor={colors.iconMuted}
        />
      </View>
      <View className="gap-3">
        <Button
          label="Следующий вопрос"
          onPress={() => router.push('/onboarding/survey-question-5')}
          disabled={!link}
        />
        <Button label="Предыдущий вопрос" variant="outline" onPress={() => router.back()} />
      </View>
    </View>
  );
}
