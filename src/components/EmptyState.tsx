import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onActionPress
}) => (
  <View className="items-center justify-center px-6 py-12 gap-3">
    <Text className="text-lg font-semibold text-text text-center">{title}</Text>
    {description && <Text className="text-sm text-text-muted text-center">{description}</Text>}
    {actionLabel && <Button label={actionLabel} onPress={onActionPress} />}
  </View>
);
