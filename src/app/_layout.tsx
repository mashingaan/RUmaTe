import React from 'react';
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { AppStateStatus, Platform } from 'react-native';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useAppState } from '@/hooks/useAppState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 30
    }
  }
});

export default function RootLayout() {
  useOnlineManager();
  useAppState((status) => {
    focusManager.setFocused(status === 'active');
  });

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
