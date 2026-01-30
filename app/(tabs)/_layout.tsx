import SafeScreenTabs from "@/components/SafeScreenTabs";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

const TabsLayout = () => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);

  return (
    <SafeScreenTabs>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          // tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderColor: COLORS.text,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderEndWidth: 1,
            borderStartWidth: 1,
            position: "absolute",
            left: 0,
            right: 0,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            padding: 0,
            fontSize: 13,
            fontWeight: "300",
            textTransform: "capitalize",
            fontFamily: "Epilogue_400Regular",
            letterSpacing: 0.5,
            textAlignVertical: "center",
            top: 10,
            left: 2,
          },
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: focused
                      ? COLORS.text + "22"
                      : "transparent",
                  },
                ]}
              >
                <Feather name="home" size={30} color={color} />
              </View>
            ),
          }}
        />

        {/* Video */}
        <Tabs.Screen
          name="video"
          options={{
            title: "Video",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: focused
                      ? COLORS.text + "22"
                      : "transparent",
                  },
                ]}
              >
                <EvilIcons name="play" size={40} color={color} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="live"
          options={{
            tabBarLabel: () => null, // supprime le titre
            tabBarIcon: ({ color, focused }) => (
              <View
                style={
                  [styles.iconWrapperLive, { backgroundColor: "#FF3B30"}]}
              >
               <Feather name="radio" size={35} color="white" />
              </View>
            ),
          }}
        />

        {/* Favorites */}
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: focused
                      ? COLORS.text + "22"
                      : "transparent",
                  },
                ]}
              >
                <Ionicons name="bookmark-outline"  size={30} color={color} />
              </View>
            ),
          }}
        />

        {/* Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: focused
                      ? COLORS.text + "22"
                      : "transparent",
                  },
                ]}
              >
                <Ionicons name="person-outline" size={30} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </SafeScreenTabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapperLive: {
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    top: 10
  },
});
