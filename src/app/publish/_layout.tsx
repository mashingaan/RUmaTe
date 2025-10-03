import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function PublishLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Новая комната' }} />
      <Stack.Screen name="photos" options={{ title: 'Фото' }} />
      <Stack.Screen name="conditions" options={{ title: 'Условия' }} />
    </Stack>
  );
}
