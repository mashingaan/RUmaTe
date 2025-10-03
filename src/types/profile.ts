import type { Preference } from './preferences';

export type Profile = {
  id: string;
  full_name: string;
  avatar_url?: string;
  campus?: string;
  budget_min?: number;
  budget_max?: number;
  move_in_date?: string;
  verified: boolean;
  is_active: boolean;
  preferences?: Preference;
};
