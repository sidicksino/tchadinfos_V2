import { View, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
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

  // Color Mapping from Theme
  // Using 'primary' for active and 'textLight' or 'text' for inactive
  const primaryColor = COLORS.primary; 
  const secondaryColor = COLORS.textLight || '#8F9BB3'; 

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
          bottom: Platform.OS === 'ios' ? insets.bottom : 20, // Reduced offset
          backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)', // Increased opacity
          borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', // Subtle border
          borderWidth: 1,
        },
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'ios' ? 95 : 80} // Higher intensity
        tint={isDarkMode ? 'dark' : 'light'}
        style={styles.blurView}
      >
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

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabItem}
              >
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
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignSelf: 'center',
  },
  blurView: {
    flex: 1,
    borderRadius: 35,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70, // Fixed height for the bar content
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default CustomTabBar;
