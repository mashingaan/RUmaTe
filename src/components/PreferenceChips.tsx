import React from 'react';
import { View } from 'react-native';
import type { Preference } from '@/types/preferences';
import { Chip } from './Chip';

const preferenceLabels: Record<keyof Preference, Record<string, string>> = {
  cleanliness: {
    low: 'Чистота: лайтово',
    mid: 'Чистота: нормально',
    high: 'Чистота: строго'
  },
  pets: {
    no: 'Без животных',
    cat: 'Кошка',
    dog: 'Собака',
    ok: 'Ок с животными'
  },
  smoking: {
    no: 'Без курения',
    outside: 'Курим на улице',
    yes: 'Курение ок'
  },
  alcohol: {
    no: 'Не пью',
    rare: 'Редко',
    social: 'Соц. встречи'
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
