import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';

export default function SettingsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    />
  );
}

