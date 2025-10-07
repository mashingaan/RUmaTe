import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useProfile } from '@/hooks/useProfile';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { colors, typography } from '@/constants/theme';
import { Chip } from '@/components/Chip';
import { PreferenceChips } from '@/components/PreferenceChips';
import { BadgeCheck } from 'lucide-react-native';
import type { Preference } from '@/types/preferences';

const preferenceLabels: Record<'cleanliness' | 'pets' | 'alcohol' | 'smoking', Record<string, string>> = {
  cleanliness: {
    low: 'Не люблю убираться',
    mid: 'Нейтрален к уборке',
    high: 'Чистюля'
  },
  pets: {
    ok: 'Можно с животными',
    has: 'Есть питомец',
    no: 'Без животных'
  },
  alcohol: {
    neutral: 'Нейтрален к алкоголю',
    positive: 'Положительное отношение к алкоголю',
    negative: 'Негативное отношение к алкоголю'
  },
  smoking: {
    neutral: 'Нейтрален к курению',
    positive: 'Положительное отношение к курению',
    negative: 'Негативное отношение к курению'
  }
};

const sections: Array<{ key: keyof typeof preferenceLabels; title: string }> = [
  { key: 'cleanliness', title: 'Отношение к чистоте' },
  { key: 'pets', title: 'Отношение к животным' },
  { key: 'alcohol', title: 'Отношение к алкоголю' },
  { key: 'smoking', title: 'Отношение к курению' }
];

const getLabel = (preferences: Preference | undefined, key: keyof typeof preferenceLabels) => {
  const value = preferences?.[key];
  if (!value) return undefined;
  const mapping = preferenceLabels[key];
  return mapping[value as keyof typeof mapping];
};

export default function MyProfileScreen() {
  const { data: profile } = useProfile();
  const onboardingPreferences = useOnboardingStore((state) => state.preferences);
  const preferences = profile?.preferences ?? onboardingPreferences;

  const summaryChips = React.useMemo(() => {
    const texts = sections
      .map(({ key }) => getLabel(preferences, key))
      .filter((item): item is string => Boolean(item));
    return texts.length ? texts.slice(0, 4) : ['Добавьте ответы в анкете'];
  }, [preferences]);

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ padding: 24, gap: 24 }}>
      <View className="items-center gap-4">
        {profile?.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} className="w-28 h-28 rounded-full" />
        ) : (
          <View className="w-28 h-28 rounded-full bg-primary-soft items-center justify-center">
            <Text className="text-3xl font-semibold text-primary">
              {profile?.full_name?.[0] ?? 'И'}
            </Text>
          </View>
        )}
        <View className="flex-row items-center gap-2">
          <Text style={[typography.h1, { color: colors.text }]}>{profile?.full_name ?? 'Имя'}</Text>
          {profile?.verified && <BadgeCheck color={colors.primary} size={20} />}
        </View>
        <View className="flex-row flex-wrap gap-2 justify-center">
          {summaryChips.map((chip) => (
            <Chip key={chip} label={chip} selected />
          ))}
        </View>
      </View>

      <View className="bg-surface rounded-4xl p-5 gap-6">
        {sections.map((section, index) => {
          const valueLabel = getLabel(preferences, section.key);
          return (
            <View key={section.key} className="gap-4">
              <Text className="text-base font-semibold text-text">{section.title}</Text>
              <Chip label={valueLabel ?? 'Не указано'} selected={Boolean(valueLabel)} />
              {index < sections.length - 1 && <View className="h-px bg-border" />}
            </View>
          );
        })}
      </View>

      <View className="bg-surface rounded-4xl p-5 gap-4">
        <Text className="text-base font-semibold text-text">Ваши ответы</Text>
        <PreferenceChips preferences={preferences} />
      </View>
    </ScrollView>
  );
}

