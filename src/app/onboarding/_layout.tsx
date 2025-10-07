import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Начало', headerShown: false }} />
      <Stack.Screen name="welcome" options={{ title: 'Вход и регистрация', headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'Регистрация', headerShown: false }} />
      <Stack.Screen name="survey-intro" options={{ title: 'Опрос при регистрации', headerShown: false }} />
      <Stack.Screen name="survey-question-1" options={{ title: 'Вопрос 1', headerShown: false }} />
      <Stack.Screen name="survey-question-1-yes" options={{ title: 'Ответ "Да" на вопрос 1', headerShown: false }} />
      <Stack.Screen name="survey-question-1-no" options={{ title: 'Ответ "Нет" на вопрос 1', headerShown: false }} />
      <Stack.Screen name="survey-question-3" options={{ title: 'Вопрос 3', headerShown: false }} />
      <Stack.Screen name="survey-question-4" options={{ title: 'Вопрос 4', headerShown: false }} />
      <Stack.Screen name="survey-question-4-yes" options={{ title: 'Ответ "Да" на вопрос 4', headerShown: false }} />
    </Stack>
  );
}
