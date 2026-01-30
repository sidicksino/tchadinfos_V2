import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Menu from "../assets/images/menu.svg";
import Logo from "../assets/logo.svg";
import { getStyles } from "../assets/styles/header.Style";
import { ThemeContext } from "../context/ThemeContext";
const Header = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* Ligne 1 : logo + notif */}
      <View style={styles.headerTop}>
        <Logo style={styles.logo} fill={COLORS.text} />
        <TouchableOpacity
          onPress={() => console.log(" Notifications")}
          accessible
          accessibilityLabel="Ouvrir les notifications"
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.card}
            style={styles.notification}
          />
        </TouchableOpacity>
      </View>

      {/* Ligne 2 : barre de recherche (TouchableOpacity) + profil */}
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
          />
        </TouchableOpacity >

        <TouchableOpacity 
          style={styles.profile}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Menu fill={COLORS.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
