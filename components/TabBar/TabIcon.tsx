import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolateColor } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface TabIconProps {
  icon: LucideIcon;
  label: string;
  focused: boolean;
  color: string;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ icon: Icon, label, focused, color, size = 24 }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0, { damping: 12 });
    opacity.value = withTiming(focused ? 1 : 0, { duration: 200 });
  }, [focused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 + scale.value * 0.2 }], // Scale from 1 to 1.2
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: (1 - opacity.value) * 10 }], // Slide up
      display: opacity.value === 0 ? 'none' : 'flex'
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
      </Animated.View>
      {focused && (
          <Animated.Text style={[styles.label, { color }, animatedLabelStyle]}>
            {label}
          </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
    position: 'absolute',
    bottom: 5
  },
});

export default TabIcon;
