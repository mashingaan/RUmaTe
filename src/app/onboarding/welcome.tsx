import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors, typography } from '@/constants/theme';

const illustration = require('@/assets/onboarding/welcome.png');

export default function OnboardingWelcomeScreen() {
  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-6 mt-12">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" />
        <View className="gap-3 items-center">
          <Text style={[typography.h1, { textAlign: 'center', color: colors.text }]}>Найди соседа — найди друга!</Text>
          <Text className="text-base text-text-muted text-center">
            Присоединяйтесь к нам, чтобы найти идеального соседа по комнате.
          </Text>
        </View>
      </View>
      <View className="gap-4">
        <Link
          href="/login"
          className="text-center text-primary font-semibold bg-primary text-white py-4 rounded-full"
        >
          Войти
        </Link>
        <Link href="/register" className="text-center text-primary font-semibold">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  illustration: {
    width: 220,
    height: 180
  }
});
