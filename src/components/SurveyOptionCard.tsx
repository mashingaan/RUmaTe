import React from 'react';
import { Pressable, Text } from 'react-native';
import clsx from 'clsx';

interface SurveyOptionCardProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const SurveyOptionCard: React.FC<SurveyOptionCardProps> = ({ label, selected, onPress }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    className={clsx(
      'w-full rounded-full border px-5 py-4 items-center justify-center',
      selected ? 'bg-primary border-primary' : 'bg-surface border-border'
    )}
  >
    <Text className={clsx('text-base font-medium text-center', selected ? 'text-white' : 'text-text')}>
      {label}
    </Text>
  </Pressable>
);

