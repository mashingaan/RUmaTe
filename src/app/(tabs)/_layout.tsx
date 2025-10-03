import React from 'react';
import { Tabs } from 'expo-router';
import { House, MessageCircle, Sparkles } from 'lucide-react-native';
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
          title: 'Лента',
          tabBarIcon: ({ color }) => <House color={color} size={22} />
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Матчи',
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
    </Tabs>
  );
}
