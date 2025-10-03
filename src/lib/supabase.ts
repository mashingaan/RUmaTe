import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://supabase.local';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'public-anon-key-placeholder';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    detectSessionInUrl: false,
    autoRefreshToken: true,
    persistSession: true,
    storage: {
      getItem: SecureStore.getItemAsync,
      setItem: (key, value) => SecureStore.setItemAsync(key, value ?? ''),
      removeItem: SecureStore.deleteItemAsync
    }
  },
  global: {
    headers: {
      'x-client-info': 'rumate-expo'
    }
  }
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    void supabase.auth.startAutoRefresh();
  } else {
    void supabase.auth.stopAutoRefresh();
  }
});

export const supabaseRealtimeChannel = (channel: string) =>
  supabase.channel(channel, {
    config: {
      presence: { key: channel }
    }
  });
