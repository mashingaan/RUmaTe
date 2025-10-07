import React from 'react';
import { View } from 'react-native';
import type { Preference } from '@/types/preferences';
import { Chip } from './Chip';

const preferenceLabels: Record<keyof Preference, Record<string, string>> = {
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
  smoking: {
    neutral: 'Нейтрален к курению',
    positive: 'Положительное отношение к курению',
    negative: 'Негативное отношение к курению'
  },
  alcohol: {
    neutral: 'Нейтрален к алкоголю',
    positive: 'Положительное отношение к алкоголю',
    negative: 'Негативное отношение к алкоголю'
  },
  sleep: {
    early: 'Ранний режим',
    flex: 'Гибкий режим',
    late: 'Сова'
  }
};

export const PreferenceChips: React.FC<{ preferences?: Preference }> = ({ preferences }) => {
  if (!preferences) return null;
  return (
    <View className="flex-row flex-wrap gap-2">
      {(Object.keys(preferences) as (keyof Preference)[]).map((key) => {
        const value = preferences[key];
        if (!value) return null;
        return <Chip key={key} label={preferenceLabels[key][value]} />;
      })}
    </View>
  );
};
