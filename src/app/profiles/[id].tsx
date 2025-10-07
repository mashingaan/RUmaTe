import React from 'react';
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, typography } from '@/constants/theme';
import { getMockProfileById } from '@/data/mockProfiles';
import { BadgeCheck, ArrowLeft, Heart, MessageCircle, Star } from 'lucide-react-native';
import { PreferenceChips } from '@/components/PreferenceChips';

export default function ProfileDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const profile = params.id ? getMockProfileById(params.id) : undefined;

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        <Text className="text-base text-text-muted">Анкета не найдена</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="h-80">
        <ImageBackground source={profile.cover} style={{ flex: 1 }}>
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(25,16,78,0.45)' }]}
          />
          <View className="flex-1 justify-between">
            <View className="flex-row justify-between items-center px-5 pt-12">
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => router.back()}
                className="w-11 h-11 rounded-full bg-white/90 items-center justify-center"
              >
                <ArrowLeft color={colors.primary} size={20} />
              </TouchableOpacity>
              <View className="w-11 h-11 rounded-full bg-white/90 items-center justify-center">
                <Star color={colors.primary} size={20} />
              </View>
            </View>
            <View className="px-5 pb-10 gap-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-white text-3xl font-semibold">{profile.name}</Text>
                {profile.verified && <BadgeCheck color="#fff" size={22} />}
              </View>
              <View className="flex-row items-center gap-3">
                <Text className="text-white text-base">{profile.role}</Text>
                <View className="px-3 py-1 rounded-full bg-white/15">
                  <Text className="text-white text-sm font-medium">{profile.match}% Match</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className="-mt-12">
        <View className="self-center bg-bg rounded-full p-1 border border-border">
          <Image source={profile.avatar} className="w-24 h-24 rounded-full" />
        </View>
      </View>
      <View className="px-5 mt-6 gap-6">
        <View className="bg-surface rounded-4xl p-5 gap-4">
          <Text style={[typography.h2, { color: colors.text }]}>О себе</Text>
          <Text className="text-base text-text-muted leading-6">{profile.about}</Text>
          <View className="flex-row flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <View key={tag} className="px-3 py-1 rounded-full bg-primary-soft/60">
                <Text className="text-sm text-primary font-medium">{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="bg-surface rounded-4xl p-5 gap-4">
          <Text style={[typography.h2, { color: colors.text }]}>Предпочтения</Text>
          <PreferenceChips preferences={profile.preferences} />
        </View>
        <View className="flex-row justify-center gap-4">
          <TouchableOpacity
            accessibilityRole="button"
            className="w-16 h-16 rounded-full border border-border bg-surface items-center justify-center"
          >
            <ArrowLeft color={colors.text} size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            className="w-16 h-16 rounded-full bg-primary items-center justify-center"
          >
            <Heart color="#fff" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            className="w-16 h-16 rounded-full border border-border bg-surface items-center justify-center"
          >
            <MessageCircle color={colors.text} size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
