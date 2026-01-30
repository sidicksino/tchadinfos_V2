import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { OnboardingData } from './OnboardingData';

interface Props {
  data: OnboardingData[];
  x: SharedValue<number>;
}

const Paginator = ({ data, x }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const widthAnimation = interpolate(
            x.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [10, 30, 10], // Long dash for active
            Extrapolation.CLAMP
          );

          const opacityAnimation = interpolate(
            x.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [0.3, 1, 0.3],
            Extrapolation.CLAMP
          );
          
          const backgroundColor = interpolateColor(
            x.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            ['#4a5568', '#00d4ff', '#4a5568'] // Grey -> Cyan
          );

          return {
            width: widthAnimation,
            opacity: opacityAnimation,
            backgroundColor
          };
        });

        return (
          <Animated.View
            style={[styles.dot, animatedDotStyle]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 6,
  },
});

export default Paginator;
