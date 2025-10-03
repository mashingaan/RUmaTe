import React, { useMemo } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useListings } from '@/hooks/useListings';
import { useSearchStore } from '@/store/useSearchStore';
import { ListingCard } from '@/components/ListingCard';
import { MiniMap } from '@/components/MiniMap';
import { Chip } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/constants/theme';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const filterChips = [
  { key: 'budget', label: 'Бюджет' },
  { key: 'commute', label: 'До кампуса' },
  { key: 'furnished', label: 'Мебель' },
  { key: 'pets', label: 'Животные' },
  { key: 'smoking', label: 'Курение' }
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

  const handleContact = (listing: any) => {
    if (!isAuthenticated) {
      Alert.alert('Требуется вход', 'Войдите, чтобы связаться с хозяином.');
      return;
    }
    router.push('/(tabs)/messages');
  };

  const renderItem = ({ item }: any) => (
    <ListingCard listing={item} onContact={() => handleContact(item)} />
  );

  return (
    <View className="flex-1 bg-bg">
      <View className="px-4 pt-4 pb-3 gap-3">
        <Text className="text-2xl font-semibold text-text">Найдите соседей за пару тапов</Text>
        <TextInput
          placeholder="Поиск по адресу или району"
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
          title="Не удалось загрузить объявления"
          description="Проверьте подключение к сети и попробуйте снова"
          actionLabel="Повторить"
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
              title="Пока пусто"
              description="Попробуйте изменить фильтры или опубликуйте свою комнату"
              actionLabel="Создать объявление"
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
