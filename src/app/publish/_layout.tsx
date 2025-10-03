import React from 'react';
import { Stack } from 'expo-router';

export default function PublishLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'РќРѕРІР°СЏ РєРѕРјРЅР°С‚Р°' }} />
      <Stack.Screen name="photos" options={{ title: 'Р¤РѕС‚Рѕ' }} />
      <Stack.Screen name="conditions" options={{ title: 'РЈСЃР»РѕРІРёСЏ' }} />
    </Stack>
  );
}

