import React from 'react';
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BadgeCheck, Filter, Sparkles } from 'lucide-react-native';
import { colors, typography } from '@/constants/theme';
import { mockProfiles } from '@/data/mockProfiles';

const overlayColors = ['rgba(75,48,255,0.55)', 'rgba(49,32,210,0.55)', 'rgba(80,48,255,0.55)'];

export default function MatchesScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg px-5 pt-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text style={[typography.h1, { color: colors.text }]}>Анкеты</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-primary-soft items-center justify-center">
          <Filter color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap gap-4 justify-between pb-12">
        {mockProfiles.map((profile, index) => (
          <TouchableOpacity
            key={profile.id}
            onPress={() => router.push(`/profiles/${profile.id}`)}
            className="w-[48%] h-60 rounded-3xl overflow-hidden"
            activeOpacity={0.9}
          >
            <ImageBackground
              source={profile.cover}
              imageStyle={{ borderRadius: 24 }}
              style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}
            >
              <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColors[index % overlayColors.length] }]} />
              <View className="justify-between flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-white text-sm font-semibold">{profile.match}% Match</Text>
                  <Sparkles color="white" size={18} />
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-white text-xl font-semibold shrink">{profile.name}</Text>
                    {profile.verified && <BadgeCheck color="#fff" size={18} />}
                  </View>
                  <Text className="text-white/90 text-sm mt-1">{profile.role}</Text>
                  <View className="flex-row flex-wrap gap-2 mt-3">
                    {profile.tags.slice(0, 3).map((tag) => (
                      <Text
                        key={tag}
                        className="text-xs text-white px-3 py-1 rounded-full bg-white/15"
                      >
                        {tag}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
