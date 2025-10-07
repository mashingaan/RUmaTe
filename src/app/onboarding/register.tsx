import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/Button';
import { colors, typography } from '@/constants/theme';

export default function OnboardingRegisterScreen() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View className="flex-1 bg-bg px-6 py-12 justify-between">
      <View className="items-center gap-4 mt-12">
        <Text style={[typography.h1, { color: colors.primary }]}>RUmaTe</Text>
        <Text className="text-base text-text text-center">
          Введите логин и пароль от личного кабинета РУТ МИИТ
        </Text>
        <View className="w-full gap-3 mt-4">
          <TextInput
            value={login}
            onChangeText={setLogin}
            placeholder="Введите логин"
            className="bg-surface rounded-full px-5 py-4 border border-border text-base"
            placeholderTextColor={colors.iconMuted}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Введите пароль"
            secureTextEntry
            className="bg-surface rounded-full px-5 py-4 border border-border text-base"
            placeholderTextColor={colors.iconMuted}
          />
        </View>
      </View>
      <View className="gap-4">
        <Button label="Продолжить" onPress={() => {}} />
        <Link href="/onboarding/welcome" className="text-center text-primary font-semibold">
          Уже есть аккаунт? Войти
        </Link>
      </View>
    </View>
  );
}
