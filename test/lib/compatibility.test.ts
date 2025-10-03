import { calculateCompatibility } from '@/lib/compatibility';

describe('calculateCompatibility', () => {
  it('returns 100 for identical preferences', () => {
    const prefs = {
      cleanliness: 'mid',
      pets: 'ok',
      smoking: 'no',
      alcohol: 'social',
      sleep: 'flex'
    } as const;
    expect(calculateCompatibility(prefs, prefs)).toBe(100);
  });

  it('penalises differences', () => {
    const a = {
      cleanliness: 'high',
      pets: 'no',
      smoking: 'no',
      alcohol: 'rare',
      sleep: 'early'
    } as const;
    const b = {
      cleanliness: 'low',
      pets: 'dog',
      smoking: 'yes',
      alcohol: 'social',
      sleep: 'late'
    } as const;
    expect(calculateCompatibility(a, b)).toBeLessThan(60);
  });
});
