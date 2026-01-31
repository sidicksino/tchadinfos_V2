import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, ViewToken, Platform, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import NextButton from '../components/Onboarding/NextButton';
import { ONBOARDING_DATA, OnboardingData } from '../components/Onboarding/OnboardingData';
import OnboardingItem from '../components/Onboarding/OnboardingItem';
import Paginator from '../components/Onboarding/Paginator';

const { width, height } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);

  // Force Status Bar to Light Content (White Text)
  useEffect(() => {
    RNStatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
        RNStatusBar.setTranslucent(true);
        RNStatusBar.setBackgroundColor('transparent');
    }
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const scrollTo = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Force Status Bar to be Light (White Text) and Transparent */}
      <StatusBar style="light" backgroundColor="transparent" translucent={true} />
      
      {/* Background Gradient */}
      <LinearGradient
        // Deep Blue -> Black Gradient
        colors={['#001a4d', '#000000']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Background Tech Overlay (Optional pattern could go here) */}
      <View style={styles.topGlow} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={finishOnboarding} style={styles.skipButton}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Animated.FlatList
            ref={flatListRef}
            data={ONBOARDING_DATA}
            renderItem={({ item, index }) => <OnboardingItem item={item} index={index} x={x} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>

        <View style={styles.footer}>
            <Paginator data={ONBOARDING_DATA} x={x} />
            <NextButton
              currentIndex={currentIndex}
              length={ONBOARDING_DATA.length}
              scrollTo={scrollTo}
              onDone={finishOnboarding}
            />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topGlow: {
      position: 'absolute',
      top: -height * 0.2,
      left: -width * 0.2,
      width: width * 1.5,
      height: width * 1.2,
      borderRadius: width,
      backgroundColor: 'rgba(0, 51, 160, 0.2)',
  },
  skipContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: 'flex-end',
    height: 50,
    justifyContent: 'center',
    zIndex: 10,
  },
  skipButton: {
      padding: 8,
  },
  skipText: {
    fontSize: 14,
    color: '#00d4ff', // Cyan
    fontWeight: '700',
    letterSpacing: 1,
  },
  footer: {
      height: 150,
      justifyContent: 'space-between',
      paddingBottom: 20
  }
});
