import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/context/ThemeContext";
import { FavoritesContext } from "@/context/FavoritesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { getStyles } from "@/assets/styles/profile.Style";
// Assuming LogoRouge is not needed in the new design or used differently
// import LogoRouge from "@/assets/images/logoRouge.svg"; 

import { useUser, useClerk } from "@clerk/clerk-expo";

const Profile = () => {
  const router = useRouter();
  const { COLORS, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  
  const { newsBookmarks = [], videoBookmarks = [] } = useContext(FavoritesContext) || {};
  const [readCount, setReadCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
        const loadStats = async () => {
            try {
                const count = await AsyncStorage.getItem("total_reads");
                setReadCount(count ? parseInt(count) : 0);
            } catch (e) { console.error(e); }
        };
        loadStats();
    }, [])
  );

  // State for toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Render a single setting row
  const SettingItem = ({ icon, label, type = "link", onPress, color, value, onValueChange }: any) => (
    <TouchableOpacity 
        style={styles.menuItem} 
        onPress={type === "link" ? onPress : undefined}
        activeOpacity={type === "link" ? 0.7 : 1}
    >
        <View style={styles.menuLeft}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={22} color={color || COLORS.text} />
            </View>
            <Text style={[styles.menuText, color && { color }]}>{label}</Text>
        </View>
        
        {type === "toggle" ? (
            <Switch
                trackColor={{ false: "#767577", true: COLORS.neon || "#00d4ff" }}
                thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChange}
                value={value}
            />
        ) : (
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        )}
    </TouchableOpacity>
  );

  const handleSignOut = async () => {
      try {
          await signOut();
          router.replace("/(auth)/sign-in");
      } catch (err) {
          console.error("Sign out error", err);
      }
  };

  return (
    <SafeScreenScondaire>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <ScrollView 
        contentContainerStyle={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSpace} />

        {/* User Card */}
        <View style={styles.profileHeader}>
            <View style={styles.userCard}>
                {isSignedIn ? (
                    <>
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
                            <TouchableOpacity style={styles.editBadge}>
                                <MaterialCommunityIcons name="pencil" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.userName}>{user?.fullName || user?.firstName || "Utilisateur"}</Text>
                        <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>

                        {/* Stats Row */}
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{readCount}</Text>
                                <Text style={styles.statLabel}>Lectures</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{newsBookmarks.length + videoBookmarks.length}</Text>
                                <Text style={styles.statLabel}>Favoris</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={[styles.avatarContainer, { backgroundColor: COLORS.glassSurface }]}>
                            <Ionicons name="person-circle-outline" size={80} color={COLORS.textLight} />
                        </View>
                        <Text style={styles.userName}>Invité</Text>
                        <Text style={styles.userEmail}>Connectez-vous pour plus de fonctionnalités</Text>
                        <TouchableOpacity 
                            style={[styles.menuItem, { backgroundColor: COLORS.neon, marginTop: 20, justifyContent: 'center' }]}
                            onPress={() => router.push("/(auth)/sign-in")}
                        >
                             <Text style={{ fontWeight: 'bold', color: '#000' }}>Se connecter / S'inscrire</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.settingsContainer}>
            
            <Text style={styles.sectionTitle}>Préférences</Text>
            <SettingItem 
                icon="moon-outline" 
                label="Mode Sombre" 
                type="toggle" 
                value={isDarkMode}
                onValueChange={toggleTheme}
            />
            {/* ... other settings ... */}
             <SettingItem 
                icon="notifications-outline" 
                label="Notifications" 
                type="toggle" 
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
            />

            <Text style={styles.sectionTitle}>Compte</Text>
            <SettingItem icon="person-outline" label="Éditer le Profil" onPress={() => {}} />
            <SettingItem icon="lock-closed-outline" label="Sécurité & Privacité" onPress={() => {}} />
            <SettingItem icon="language-outline" label="Langue" onPress={() => {}} />

            <Text style={styles.sectionTitle}>Support</Text>
            <SettingItem icon="help-circle-outline" label="Aide & FAQ" onPress={() => {}} />
            <SettingItem icon="information-circle-outline" label="À propos" onPress={() => router.push("/pages/about")} />
            
            <View style={{ height: 20 }} />
            
            {isSignedIn && (
                <SettingItem 
                    icon="log-out-outline" 
                    label="Déconnexion" 
                    color="#ef4444"
                    onPress={handleSignOut} 
                />
            )}
            
            <Text style={{ textAlign: 'center', marginTop: 30, color: COLORS.textLight, fontSize: 12 }}>
                TchadInfos V2.0.1 • Build 2026
            </Text>
        </View>

      </ScrollView>
    </SafeScreenScondaire>
  );
};

export default Profile;
