import React from 'react';
import { Redirect } from 'expo-router';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export default function Index() {
  const form = useOnboardingStore((state) => state.form);
  const completed = Boolean(form.campus && form.budget && form.moveInDate);
  return <Redirect href={completed ? '/(tabs)/home' : '/onboarding'} />;
}
