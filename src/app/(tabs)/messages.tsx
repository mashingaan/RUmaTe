import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { mockChats, getProfileByChat } from '@/data/mockChats';
import { mockProfiles } from '@/data/mockProfiles';

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="flex-row justify-between items-center">
        <Text style={[typography.h1, { color: colors.text }]}>Чаты</Text>
        <Text className="text-sm text-primary">32 симпатии</Text>
      </View>

      <View className="gap-3">
        <Text className="text-sm font-semibold text-text-muted">Взаимные симпатии</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
          {mockProfiles.slice(0, 6).map((profile) => (
            <TouchableOpacity
              key={profile.id}
              onPress={() => router.push(`/profiles/${profile.id}`)}
              className="items-center gap-2"
              accessibilityRole="button"
            >
              <Image source={profile.avatar} className="w-16 h-16 rounded-full" />
              <Text className="text-xs text-text" numberOfLines={1}>
                {profile.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="bg-surface rounded-4xl">
        {mockChats.map((chat, index) => {
          const partner = getProfileByChat(chat);
          return (
            <View key={chat.id}>
              <TouchableOpacity
                className="flex-row items-center gap-4 px-4 py-4"
                onPress={() => router.push(`/messages/${chat.id}`)}
                accessibilityRole="button"
              >
                <Image source={partner?.avatar ?? { uri: 'https://source.boringavatars.com/marble/256/default' }} className="w-14 h-14 rounded-full" />
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-text">{partner?.name ?? 'Собеседник'}</Text>
                    <Text className="text-xs text-text-muted">{chat.time}</Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-sm text-text-muted flex-1" numberOfLines={2}>
                      {chat.preview}
                    </Text>
                    {chat.unread && <View className="w-2.5 h-2.5 rounded-full bg-primary ml-2" />}
                  </View>
                </View>
              </TouchableOpacity>
              {index < mockChats.length - 1 && <View className="h-px bg-border ml-24" />}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
