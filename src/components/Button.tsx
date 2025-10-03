import { ActivityIndicator, Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  loading?: boolean;
  className?: string;
}

const baseStyles =
  'h-12 rounded-xl flex-row items-center justify-center px-4 gap-2 active:opacity-90';

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  loading,
  disabled,
  className,
  ...props
}) => {
  const variants: Record<typeof variant, string> = {
    primary: 'bg-primary',
    outline: 'border border-border bg-surface',
    ghost: 'bg-transparent',
    danger: 'bg-danger'
  };

  const textVariants: Record<typeof variant, string> = {
    primary: 'text-white',
    outline: 'text-text',
    ghost: 'text-primary',
    danger: 'text-white'
  };

  return (
    <Pressable
      accessibilityRole="button"
      className={clsx(baseStyles, variants[variant], className, disabled && 'opacity-50')}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#1F6AA5'} />
      )}
      <Text className={clsx('font-semibold text-base', textVariants[variant])}>{label}</Text>
    </Pressable>
  );
};
