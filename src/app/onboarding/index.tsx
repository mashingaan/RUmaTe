import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { colors, typography } from '@/constants/theme';

export default function OnboardingStartScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg px-8">
      <View className="w-32 h-32 rounded-full bg-primary-soft items-center justify-center">
        <Text style={[typography.h1, { color: colors.primary }]}>RU</Text>
      </View>
      <Text style={[typography.h1, { color: colors.primary, marginTop: 24 }]}>RUmaTe</Text>
      <Link
        href="/onboarding/welcome"
        className="mt-12 text-primary text-base font-semibold"
      >
        Перейти к входу
      </Link>
    </View>
  );
}
