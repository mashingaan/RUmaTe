import React from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { PreferenceChips } from '@/components/PreferenceChips';
import { Button } from '@/components/Button';
import { colors } from '@/constants/theme';

export default function ProfileScreen() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const [fullName, setFullName] = React.useState(profile?.full_name ?? '');

  React.useEffect(() => {
    setFullName(profile?.full_name ?? '');
  }, [profile?.full_name]);

  const handleSave = () => {
    if (!profile?.id) return;
    updateProfile.mutate({ id: profile.id, full_name: fullName });
  };

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="items-center gap-3">
        {profile?.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} className="w-24 h-24 rounded-full" />
        ) : (
          <View className="w-24 h-24 rounded-full bg-primary-soft items-center justify-center">
            <Text className="text-2xl font-semibold text-primary">
              {profile?.full_name?.[0] ?? '?'}
            </Text>
          </View>
        )}
        <View className="flex-row items-center gap-2">
          <Text className="text-xl font-semibold text-text">{profile?.full_name ?? 'Гость'}</Text>
          {profile?.verified && (
            <View className="bg-primary-soft px-3 py-1 rounded-full">
              <Text className="text-xs text-primary font-medium">Верифицирован</Text>
            </View>
          )}
        </View>
        <Text className="text-sm text-text-muted">{profile?.campus ?? 'Кампус не указан'}</Text>
      </View>

      <View className="bg-surface rounded-3xl p-4 gap-3">
        <Text className="text-sm text-text-muted">Полное имя</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Имя"
          className="border border-border rounded-2xl px-4 py-3"
          placeholderTextColor={colors.iconMuted}
        />
        <Button label="Сохранить" onPress={handleSave} loading={updateProfile.isLoading} />
      </View>

      <View className="bg-surface rounded-3xl p-4 gap-3">
        <Text className="text-lg font-semibold text-text">Предпочтения</Text>
        <PreferenceChips preferences={profile?.preferences} />
      </View>
    </ScrollView>
  );
}
