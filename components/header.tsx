import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Menu from "../assets/images/menu.svg";
import Logo from "../assets/logo.svg";
import { getStyles } from "../assets/styles/header.Style";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();

  // Tech Colors
  const iconColor = isDarkMode ? COLORS.white : COLORS.text;
  const accentColor = COLORS.neon || '#00d4ff';

  return (
    <View style={styles.header}>
      {/* Ligne 1 : logo + notif */}
      <View style={styles.headerTop}>
        <Logo width={140} height={35} style={styles.logo} fill={COLORS.text} />
        <TouchableOpacity
          onPress={() => console.log("Notifications")}
          accessible
          accessibilityLabel="Ouvrir les notifications"
          style={styles.notification}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={accentColor}
          />
        </TouchableOpacity>
      </View>

      {/* Ligne 2 : barre de recherche (TouchableOpacity) + menu */}
      <View style={styles.headerBottom}>
        <TouchableOpacity
          style={styles.searchBox}
          onPress={() => router.push("/search")}
          activeOpacity={0.7}
        >
          <Text style={styles.reseachText}>Rechercher une actualité...</Text>
          <Ionicons
            name="search-outline"
            size={20}
            style={styles.reseachIcon}
            color={accentColor}
          />
        </TouchableOpacity >

        <TouchableOpacity 
          style={styles.profile}
          onPress={() => router.push("/(tabs)/profile")}
        >
           {/* Uniform Tech Accent for Menu */}
          <Menu width={22} height={22} fill={accentColor}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
