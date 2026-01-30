import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { OnboardingData } from './OnboardingData';

interface Props {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
}

const OnboardingItem = ({ item, index, x }: Props) => {
  const { width, height } = useWindowDimensions();

  const circleAnimation = useAnimatedStyle(() => {
    const rotate = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 360, 0],
      Extrapolation.CLAMP
    );
     const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 0.8, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const imageAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );
      const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
        opacity,
      transform: [{ scale }],
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [100, 0, 100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={[styles.container, { width, height }]}>
        {/* Background Tech Elements */}
        
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
             <Animated.View style={[styles.techRing, circleAnimation]}>
                <LinearGradient
                    colors={['transparent', '#00d4ff', 'transparent']}
                    style={styles.techRingGradient}
                    start={{x:0, y:0}}
                    end={{x:1, y:1}}
                />
             </Animated.View>
        </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
          {item.image && (
              <Animated.Image
                source={item.image as ImageSourcePropType}
                style={[styles.image, { width: width * 0.9 }, imageAnimation]}
              />
          )}
      </View>

      {/* Content Section (Glass Card) */}
       <Animated.View style={[styles.contentContainer, { width: width * 0.9 }, textAnimation]}>
          <BlurView intensity={30} tint="dark" style={styles.glassCard}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>{item.description}</Text>
          </BlurView>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techRing: {
    position: 'absolute',
    top: '15%',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.1)',
    alignSelf: 'center',
  },
  techRingGradient: {
      flex: 1,
      borderRadius: 150,
      opacity: 0.3
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    height: '80%', // Limit height to avoid overlap
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  glassCard: {
    width: '100%',
    padding: 24,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0,0,0,0.3)', // Fallback / Shade
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'System', // Or standard modern font
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 212, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  divider: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#00d4ff',
      marginBottom: 16,
  },
  description: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
  },
});

export default OnboardingItem;
