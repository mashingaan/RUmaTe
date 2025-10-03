import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/hooks/useListings', () => ({
  useListings: () => ({
    data: [
      {
        id: '1',
        title: 'Test listing',
        description: 'Description',
        price: 25000,
        address: 'Address',
        lat: 0,
        lng: 0,
        minutes_to_campus: 15,
        roommates_count: 2,
        features: { furnished: true },
        compatibility_index: 82,
        images: [],
        owner_id: 'owner'
      }
    ],
    isLoading: false,
    isError: false,
    refetch: jest.fn()
  })
}));

jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ isAuthenticated: false })
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

const createClient = () => new QueryClient();

describe('HomeScreen', () => {
  it('renders listings', () => {
    render(
      <QueryClientProvider client={createClient()}>
        <HomeScreen />
      </QueryClientProvider>
    );

    expect(screen.getByText('Test listing')).toBeTruthy();
  });
});
