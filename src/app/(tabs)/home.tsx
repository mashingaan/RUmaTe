import React, { useMemo } from 'react';
import { Alert, FlatList, ListRenderItem, Pressable, Text, TextInput, View } from 'react-native';
import { useListings } from '@/hooks/useListings';
import { useSearchStore } from '@/store/useSearchStore';
import { ListingCard } from '@/components/ListingCard';
import { MiniMap } from '@/components/MiniMap';
import { Chip } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import type { Listing } from '@/types/listing';
import { colors } from '@/constants/theme';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const filterChips = [
  { key: 'budget', label: 'Р‘СЋРґР¶РµС‚' },
  { key: 'commute', label: 'Р”Рѕ РєР°РјРїСѓСЃР°' },
  { key: 'furnished', label: 'РњРµР±РµР»СЊ' },
  { key: 'pets', label: 'Р–РёРІРѕС‚РЅС‹Рµ' },
  { key: 'smoking', label: 'РљСѓСЂРµРЅРёРµ' }
];

export default function HomeScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useListings();
  const { query, setQuery } = useSearchStore();
  const { isAuthenticated } = useAuth();

  const listings = useMemo(() => {
    if (!data) return [];
    return isAuthenticated ? data : data.slice(0, 5);
  }, [data, isAuthenticated]);

  const handleContact = (_listing: Listing) => {
    if (!isAuthenticated) {
      Alert.alert('РўСЂРµР±СѓРµС‚СЃСЏ РІС…РѕРґ', 'Р’РѕР№РґРёС‚Рµ, С‡С‚РѕР±С‹ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ С…РѕР·СЏРёРЅРѕРј.');
      return;
    }
    router.push('/(tabs)/messages');
  };

  const renderItem: ListRenderItem<Listing> = ({ item }) => (
    <ListingCard listing={item} onContact={() => handleContact(item)} />
  );

  return (
    <View className="flex-1 bg-bg">
      <View className="px-4 pt-4 pb-3 gap-3">
        <Text className="text-2xl font-semibold text-text">РќР°Р№РґРёС‚Рµ СЃРѕСЃРµРґРµР№ Р·Р° РїР°СЂСѓ С‚Р°РїРѕРІ</Text>
        <TextInput
          placeholder="РџРѕРёСЃРє РїРѕ Р°РґСЂРµСЃСѓ РёР»Рё СЂР°Р№РѕРЅСѓ"
          value={query}
          onChangeText={setQuery}
          className="bg-surface border border-border rounded-2xl px-4 py-3 text-base"
          placeholderTextColor={colors.iconMuted}
        />
        <View className="flex-row flex-wrap gap-2">
          {filterChips.map((chip) => (
            <Chip key={chip.key} label={chip.label} />
          ))}
        </View>
      </View>
      {isError && (
        <EmptyState
          title="РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ РѕР±СЉСЏРІР»РµРЅРёСЏ"
          description="РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕРґРєР»СЋС‡РµРЅРёРµ Рє СЃРµС‚Рё Рё РїРѕРїСЂРѕР±СѓР№С‚Рµ СЃРЅРѕРІР°"
          actionLabel="РџРѕРІС‚РѕСЂРёС‚СЊ"
          onActionPress={() => void refetch()}
        />
      )}
      {isLoading && (
        <View className="px-4 gap-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={220} />
          ))}
        </View>
      )}
      {!isLoading && !isError && (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 240 }}
          ListEmptyComponent={
            <EmptyState
              title="РџРѕРєР° РїСѓСЃС‚Рѕ"
              description="РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ С„РёР»СЊС‚СЂС‹ РёР»Рё РѕРїСѓР±Р»РёРєСѓР№С‚Рµ СЃРІРѕСЋ РєРѕРјРЅР°С‚Сѓ"
              actionLabel="РЎРѕР·РґР°С‚СЊ РѕР±СЉСЏРІР»РµРЅРёРµ"
              onActionPress={() => {}}
            />
          }
        />
      )}
      <Pressable
        accessibilityRole="button"
        className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center shadow-lg"
        onPress={() => router.push('/publish')}
      >
        <Plus color="#fff" size={28} />
      </Pressable>
      <View className="absolute bottom-4 left-0 right-0 px-4">
        <MiniMap listings={listings} />
      </View>
    </View>
  );
}
