import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SafeScreenTabs from "@/components/SafeScreenTabs";
import { ThemeContext } from "@/context/ThemeContext";
import CustomTabBar from "@/components/TabBar/CustomTabBar";

const TabsLayout = () => {
  const { isDarkMode, COLORS } = useContext(ThemeContext);

  return (
    <SafeScreenTabs>
      <StatusBar style="light" backgroundColor={COLORS.cardGradient || "#0033A0"} />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="video"
          options={{
            title: "Video",
          }}
        />
        <Tabs.Screen
          name="live"
          options={{
            title: "Live",
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorites",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
    </SafeScreenTabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
