import React from 'react';
import { Tabs } from 'expo-router';
import { Home, MessageCircle, Sparkles, Settings, UserCircle2 } from 'lucide-react-native';
import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.iconMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 72 },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <Home color={color} size={22} />
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Анкеты',
          tabBarIcon: ({ color }) => <Sparkles color={color} size={22} />
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Сообщения',
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={22} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <UserCircle2 color={color} size={22} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color }) => <Settings color={color} size={22} />
        }}
      />
    </Tabs>
  );
}
