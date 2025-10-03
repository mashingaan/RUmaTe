import React, { useMemo } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

interface SkeletonProps {
  height?: number;
  width?: number | string;
  radius?: number;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

export const Skeleton: React.FC<SkeletonProps> = ({ height = 16, width = '100%', radius = 12, style }) => {
  const animated = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, [animated]);

  const opacity = animated.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 0.6, 0.3] });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: '#E5E7EB',
          opacity
        },
        style
      ]}
    />
  );
};
