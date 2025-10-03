import { Pressable, Text } from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onPress, icon }) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    className={clsx(
      'px-4 py-2 rounded-full border flex-row items-center gap-2',
      selected ? 'bg-primary-soft border-primary' : 'border-border bg-surface'
    )}
  >
    {icon}
    <Text className={clsx('text-sm font-medium', selected ? 'text-primary' : 'text-text-muted')}>
      {label}
    </Text>
  </Pressable>
);
