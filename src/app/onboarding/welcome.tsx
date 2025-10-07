import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, typography } from '@/constants/theme';

export default function OnboardingWelcomeScreen() {
  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-12">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <View className="w-44 h-44 rounded-full bg-primary-soft items-center justify-center">
          <Text className="text-2xl text-primary font-semibold">Team</Text>
        </View>
        <View className="gap-3 items-center">
          <Text style={[typography.h1, { textAlign: 'center', color: colors.text }]}>Найди соседа — найди друга!</Text>
          <Text className="text-base text-text-muted text-center">
            Присоединяйтесь к нам, чтобы найти идеального соседа по комнате.
          </Text>
        </View>
      </View>
      <View className="gap-4">
        <Button label="Войти" onPress={() => {}} className="" />
        <Link href="/onboarding/register" className="text-center text-primary font-semibold">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </View>
    </View>
  );
}
