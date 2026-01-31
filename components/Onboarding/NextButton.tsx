import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SHADOWS } from "@/constants/shadows";

interface Props {
  currentIndex: number;
  length: number;
  scrollTo: () => void;
  onDone: () => void;
}

const NextButton = ({ currentIndex, length, scrollTo, onDone }: Props) => {
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 250 }),
    };
  });

  const isLast = currentIndex === length - 1;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonWrapper, buttonAnimatedStyle]}>
        <TouchableOpacity
          onPress={isLast ? onDone : scrollTo}
          activeOpacity={0.8}
          style={styles.touchable}
        >
            <LinearGradient
                colors={isLast ? ['#00d4ff', '#0033A0'] : ['transparent', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gradient, !isLast && styles.outline]}
            >
                <Text style={[styles.text, !isLast && styles.textNext]}>
                    {isLast ? 'GET STARTED' : 'NEXT'}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    alignItems: 'center',
  },
  buttonWrapper: {
    width: 200,
    height: 56,
    borderRadius: 28,
    ...SHADOWS.techGlow('#00d4ff'),
  },
  touchable: {
      flex: 1,
      borderRadius: 28,
      overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  outline: {
      borderWidth: 2,
      borderColor: '#00d4ff',
  },
  text: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  textNext: {
      color: '#00d4ff',
  }
});

export default NextButton;
