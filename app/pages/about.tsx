import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import HeaderTertiaire from "@/components/headerTertiaire";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { getStyles } from "../../assets/styles/about.Style";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const About = () => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const openLink = (url: string) => {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeScreenScondaire>
      <View style={styles.container}>
        <HeaderTertiaire />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <LinearGradient
                colors={[COLORS.primary, 'transparent']}
                style={styles.heroGradient}
            />
            <View style={styles.logoContainer}>
                {/* Placeholder Logo text or Image */}
                <Ionicons name="newspaper" size={50} color={COLORS.neon} />
            </View>
            <Text style={styles.appName}>TchadInfos</Text>
            <Text style={styles.versionText}>v2.0.1 (Build 2026)</Text>
          </View>

          {/* Mission Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
                <Ionicons name="flag-outline" size={20} color={COLORS.neon} />  Notre Mission
            </Text>
            <View style={styles.glassCard}>
                <Text style={styles.cardText}>
                    <Text style={styles.highlight}>TchadInfos</Text> est le premier média privé d’information continue au Tchad.
                </Text>
                <Text style={styles.cardText}>
                    Nous offrons une information fiable, indépendante et accessible à tous, pour le Tchad et sa diaspora.
                </Text>
            </View>
          </View>

          {/* Vision Section */}
          <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}>
                <Ionicons name="eye-outline" size={20} color={COLORS.neon} />  Notre Vision
             </Text>
             <View style={styles.glassCard}>
                <Text style={styles.cardText}>
                    Être le miroir de la société tchadienne et la voix de ses citoyens sur la scène internationale.
                </Text>
                <Text style={[styles.cardText, { marginBottom: 0, fontStyle: 'italic', opacity: 0.8 }]}>
                    "Informer – Éduquer – Progresser"
                </Text>
             </View>
          </View>

          {/* Values Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
                <Ionicons name="diamond-outline" size={20} color={COLORS.neon} />  Nos Valeurs
            </Text>
            <View style={styles.glassCard}>
                {[
                    { label: "Professionnalisme", desc: "Publier vite mais surtout juste." },
                    { label: "Intégrité", desc: "Indépendance éditoriale totale." },
                    { label: "Innovation", desc: "Explorer de nouvelles façons de raconter." },
                    { label: "Responsabilité", desc: "Respect de la dignité et diversité." }
                ].map((item, index) => (
                    <View key={index} style={styles.bulletRow}>
                        <Ionicons name="checkmark-circle" size={18} color={COLORS.neon} style={styles.bulletIcon} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.cardText, { marginBottom: 4 }]}>
                                <Text style={styles.highlight}>{item.label}: </Text>
                                {item.desc}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
          </View>

          {/* Connect Section */}
          <View style={styles.devContainer}>
            <Text style={styles.devText}>Suivez-nous sur les réseaux</Text>
            <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://facebook.com')}>
                    <FontAwesome5 name="facebook-f" size={18} color={COLORS.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://twitter.com')}>
                    <FontAwesome5 name="twitter" size={18} color={COLORS.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => openLink('https://tchadinfos.com')}>
                    <Ionicons name="globe-outline" size={20} color={COLORS.text} />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.socialButton} onPress={() => openLink('mailto:contact@tchadinfos.com')}>
                    <Ionicons name="mail-outline" size={20} color={COLORS.text} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.devText, { marginTop: 30 }]}>
                Designed with ❤️ by Sidickino
            </Text>
          </View>

        </ScrollView>
      </View>
    </SafeScreenScondaire>
  );
};

export default About;
