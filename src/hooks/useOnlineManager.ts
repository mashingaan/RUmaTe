import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useOnlineManager = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      onlineManager.setOnline(Boolean(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = focusManager.subscribe(() => undefined);
    return () => unsubscribe();
  }, []);
};
