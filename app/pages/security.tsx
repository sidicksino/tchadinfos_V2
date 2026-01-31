import React, { useContext, useState } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from 'expo-local-authentication';

export default function SecurityPrivacy() {
    const router = useRouter();
    const { COLORS } = useContext(ThemeContext);

    // State for toggles
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [ghostMode, setGhostMode] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);

    const handleBiometricToggle = async (value: boolean) => {
        if (value) {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            if (!compatible) {
                Alert.alert("Non supporté", "Votre appareil ne supporte pas l'authentification biométrique.");
                return;
            }
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            if (!enrolled) {
                Alert.alert("Non configuré", "Veuillez configurer FaceID ou TouchID dans les réglages de votre appareil.");
                return;
            }
        }
        setBiometricEnabled(value);
    };

    const styles = StyleSheet.create({
        container: {
            padding: 20,
            paddingBottom: 40,
        },
        header: {
            marginBottom: 30,
            marginTop: 10,
        },
        title: {
            fontSize: 28,
            fontWeight: "800",
            color: COLORS.text,
            marginBottom: 8,
            letterSpacing: -0.5,
        },
        subtitle: {
            fontSize: 16,
            color: COLORS.textLight,
            lineHeight: 22,
        },
        section: {
            marginBottom: 25,
        },
        sectionHeader: {
            fontSize: 14,
            fontWeight: "700",
            color: COLORS.neon,
            marginBottom: 15,
            textTransform: "uppercase",
            letterSpacing: 1,
        },
        card: {
            backgroundColor: COLORS.card,
            borderRadius: 20,
            padding: 20,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
            // Shadow for "Tech" feel
            shadowColor: COLORS.neon,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        rowContent: {
            flex: 1,
            marginRight: 15,
        },
        label: {
            fontSize: 16,
            fontWeight: "600",
            color: COLORS.text,
            marginBottom: 4,
        },
        description: {
            fontSize: 13,
            color: COLORS.textLight,
            lineHeight: 18,
        },
        iconBox: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: COLORS.glassSurface,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
        },
        actionButton: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
        },
        actionText: {
            fontSize: 16,
            color: COLORS.text,
            marginLeft: 15,
            fontWeight: "500",
        },
        dangerText: {
             color: '#ef4444',
        }
    });

    const SettingToggle = ({ icon, title, desc, value, onValueChange, iconColor }: any) => (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={[styles.iconBox, { backgroundColor: iconColor + '20' }]}>
                    <Ionicons name={icon} size={22} color={iconColor} />
                </View>
                <View style={styles.rowContent}>
                    <Text style={styles.label}>{title}</Text>
                    <Text style={styles.description}>{desc}</Text>
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: COLORS.neon }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onValueChange}
                    value={value}
                />
            </View>
        </View>
    );

    const ActionItem = ({ icon, title, color = COLORS.text, onPress }: any) => (
         <TouchableOpacity style={[styles.card, { paddingVertical: 15 }]} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <View style={[styles.iconBox, { backgroundColor: color + '10' }]}>
                    <Ionicons name={icon} size={20} color={color} />
                </View>
                <Text style={[styles.actionText, { color, marginLeft: 0, flex: 1 }]}>{title}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </View>
         </TouchableOpacity>
    );

    return (
        <SafeScreenScondaire>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                 {/* Back Button */}
                 <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20, width: 40 }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <MaterialCommunityIcons name="shield-check-outline" size={32} color={COLORS.neon} style={{ marginRight: 10 }} />
                        <Text style={styles.title}>Sécurité</Text>
                    </View>
                    <Text style={styles.subtitle}>Gérez la protection de vos données et vos préférences de confidentialité.</Text>
                </View>

                {/* Authentication Section */}
                <Text style={styles.sectionHeader}>Authentification</Text>
                
                <SettingToggle 
                    icon="scan-outline"
                    title="Biométrie"
                    desc="Utiliser FaceID / TouchID pour sécuriser l'ouverture de l'application."
                    value={biometricEnabled}
                    onValueChange={handleBiometricToggle}
                    iconColor="#0ea5e9"
                />

                <SettingToggle 
                    icon="key-outline"
                    title="Double Facteur (2FA)"
                    desc="Renforcer la sécurité avec un code envoyé par email."
                    value={twoFactor}
                    onValueChange={setTwoFactor}
                    iconColor="#8b5cf6"
                />

                 {/* Privacy Section */}
                 <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Confidentialité</Text>

                 <SettingToggle 
                    icon="eye-off-outline"
                    title="Mode Fantôme"
                    desc="Naviguer sans enregistrer d'historique de lecture."
                    value={ghostMode}
                    onValueChange={setGhostMode}
                    iconColor="#ef4444"
                />

                <SettingToggle 
                    icon="analytics-outline"
                    title="Analyses & Améliorations"
                    desc="Partager des données d'usage anonymes pour aider à améliorer l'app."
                    value={analyticsEnabled}
                    onValueChange={setAnalyticsEnabled}
                    iconColor="#22c55e"
                />

                {/* Data Management */}
                <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Données</Text>
                
                <ActionItem icon="download-outline" title="Télécharger mes données" onPress={() => Alert.alert("Export", "Veuillez vérifier votre email pour le lien de téléchargement.")} />
                <ActionItem icon="trash-outline" title="Supprimer mon compte" color="#ef4444" onPress={() => Alert.alert("Danger", "Cette action est irréversible. Êtes-vous sûr ?", [{ text: "Annuler" }, { text: "Supprimer", style: 'destructive' }])} />

                <View style={{ height: 40 }} />
                <Text style={{ textAlign: 'center', color: COLORS.textLight, fontSize: 12 }}>
                    Vos données sont chiffrées de bout en bout.
                </Text>
                 <Text style={{ textAlign: 'center', color: COLORS.textLight, fontSize: 12, marginTop: 5 }}>
                    Politique de confidentialité v2.4
                </Text>

            </ScrollView>
        </SafeScreenScondaire>
    );
}
