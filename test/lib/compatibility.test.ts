import { calculateCompatibility } from '@/lib/compatibility';

describe('calculateCompatibility', () => {
  it('returns 100 for identical preferences', () => {
    const prefs = {
      cleanliness: 'mid',
      pets: 'ok',
      smoking: 'neutral',
      alcohol: 'neutral',
      sleep: 'flex'
    } as const;
    expect(calculateCompatibility(prefs, prefs)).toBe(100);
  });

  it('penalises differences', () => {
    const a = {
      cleanliness: 'high',
      pets: 'no',
      smoking: 'negative',
      alcohol: 'negative',
      sleep: 'early'
    } as const;
    const b = {
      cleanliness: 'low',
      pets: 'has',
      smoking: 'positive',
      alcohol: 'positive',
      sleep: 'late'
    } as const;
    expect(calculateCompatibility(a, b)).toBeLessThan(60);
  });
});
