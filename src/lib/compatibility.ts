import type { Preference } from '@/types/preferences';

const weights: Record<keyof Preference, number> = {
  cleanliness: 0.2,
  pets: 0.2,
  smoking: 0.2,
  alcohol: 0.2,
  sleep: 0.2
};

export const calculateCompatibility = (a: Preference, b: Preference): number => {
  let score = 0;
  Object.keys(weights).forEach((key) => {
    const typedKey = key as keyof Preference;
    if (!a[typedKey] || !b[typedKey]) {
      score += weights[typedKey] * 0.5;
      return;
    }
    score += a[typedKey] === b[typedKey] ? weights[typedKey] : weights[typedKey] * 0.2;
  });
  return Math.round(score * 100);
};
