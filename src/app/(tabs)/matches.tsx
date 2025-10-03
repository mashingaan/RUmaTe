import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useMatches } from '@/hooks/useMatches';
import { useProfile } from '@/hooks/useProfile';
import { PreferenceChips } from '@/components/PreferenceChips';
import { ListingCard } from '@/components/ListingCard';
import { Skeleton } from '@/components/Skeleton';
import { EmptyState } from '@/components/EmptyState';

export default function MatchesScreen() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data, isLoading, isError, refetch } = useMatches();

  return (
    <ScrollView className="flex-1 bg-bg" contentContainerStyle={{ paddingBottom: 120 }}>
      <View className="px-4 pt-4 pb-6 gap-4">
        <Text className="text-2xl font-semibold text-text">Совместимость</Text>
        {profileLoading ? (
          <Skeleton height={80} />
        ) : (
          <View className="bg-surface rounded-2xl p-4 gap-3">
            <Text className="text-lg font-semibold text-text">{profile?.full_name ?? 'Гость'}</Text>
            <PreferenceChips preferences={profile?.preferences} />
          </View>
        )}
        {isLoading && (
          <View className="gap-4">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} height={220} />
            ))}
          </View>
        )}
        {!isLoading && data?.length ? (
          data.map((match) => (
            <ListingCard key={match.id} listing={match.listing} />
          ))
        ) : null}
        {!isLoading && !isError && !data?.length && (
          <EmptyState
            title="Матчей пока нет"
            description="Пройдите опрос по предпочтениям, чтобы получать точные рекомендации"
          />
        )}
        {isError && (
          <EmptyState
            title="Не удалось получить матчи"
            actionLabel="Обновить"
            onActionPress={() => void refetch()}
          />
        )}
      </View>
    </ScrollView>
  );
}
