
import '@testing-library/jest-native/extend-expect';
import React, { ComponentProps, forwardRef } from 'react';
import { View } from 'react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { server } from './test/mocks/server';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

type ViewProps = ComponentProps<typeof View>;

const MockMap = forwardRef<View, ViewProps>((props, ref) => (
  React.createElement(View, { ...props, ref }, props.children)
));
MockMap.displayName = 'MockMapView';

const MockMarker: React.FC<ViewProps> = (props) => (
  React.createElement(View, props, props.children)
);
MockMarker.displayName = 'MockMarker';

jest.mock('react-native-maps', () => ({
  __esModule: true,
  default: MockMap,
  Marker: MockMarker,
  PROVIDER_GOOGLE: 'google'
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
