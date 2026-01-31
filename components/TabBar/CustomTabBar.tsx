import { View, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SHADOWS } from "@/constants/shadows";
import { BlurView } from 'expo-blur';
import { Home, PlayCircle, Radio, Heart, User, LayoutGrid } from 'lucide-react-native';
import TabIcon from './TabIcon';
import React, { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Color Mapping
  // Using Neon Blue for active tabs instead of theme primary (which might be Red/Brown)
  const primaryColor = COLORS.textLight; 
  const secondaryColor = COLORS.textLight; 

  const icons: { [key: string]: any } = {
    index: Home,
    video: PlayCircle,
    live: Radio,
    favorite: Heart,
    profile: User,
  };

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Platform.OS === 'ios' ? 10 : 0,
          // Transparent bg here, BlurView handles it.
          // Optional: slight shadow tint if needed, but keeping it clean.
          backgroundColor: 'transparent', 
        },
      ]}
    >
      {/* 1. Blur Layer (Absolute Background) */}
      <BlurView
        intensity={Platform.OS === 'ios' ? 80 : 0} 
        tint={isDarkMode ? 'dark' : 'default'}
        style={[StyleSheet.absoluteFill, { borderRadius: 35, overflow: 'hidden' }]}
      />
      
      {/* 1.5 Fallback Background for Android or if Blur fails */}
      <View style={[
          StyleSheet.absoluteFill, 
          { 
              backgroundColor: isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)',
              borderRadius: 35,
              opacity: Platform.OS === 'ios' ? 0 : 1 // Only visible where Blur is weak/off
          }
      ]} />

      {/* 2. Border Layer (on top of blur) */}
      <View style={[
          StyleSheet.absoluteFill,
          {
              borderWidth: 1,
              borderColor: COLORS.border || 'rgba(0,0,0,0.1)',
              borderRadius: 35,
          }
      ]} />

      {/* 3. Content Layer (Siblings to Blur, so they can float out if needed) */}
      <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            const isLive = route.name === 'live';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const IconComponent = icons[route.name] || LayoutGrid;

            // Special Render for LIVE Tab
            if (isLive) {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.liveButtonContainer} // Now has flex: 1
                        activeOpacity={0.8}
                    >
                        <View style={[styles.liveButton, { backgroundColor: '#FF3B30' }]}>
                             <IconComponent size={28} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={(options as any).tabBarTestID}
                onPress={onPress}
                style={styles.tabItem}
              >
                {/* Active Tab Glass Background */}
                {isFocused && (
                     <View style={[
                         StyleSheet.absoluteFillObject, 
                         { 
                             backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                             borderRadius: 25,
                             margin: 5
                         }
                     ]} />
                )}

                <TabIcon
                  icon={IconComponent}
                  label={label as string}
                  focused={isFocused}
                  color={isFocused ? primaryColor : secondaryColor}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    // overflow: 'visible' is default, creating explicit visible just in case
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    ...SHADOWS.large, // Replaces manual shadow/elevation
    alignSelf: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between', // Using flex 1 on items, so strictly it handles itself
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  liveButtonContainer: {
     flex: 1, // Crucial for centering inside the flex row
     height: '100%',
     alignItems: 'center',
     justifyContent: 'center',
  },
  liveButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.8)',
      // Float Logic
      position: 'absolute',
      shadowColor: "#FF3B30",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 5,
  }
});

export default CustomTabBar;
