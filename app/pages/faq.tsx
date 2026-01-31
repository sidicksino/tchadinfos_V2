import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { LinearGradient } from "expo-linear-gradient";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQ_DATA = [
    {
        id: 1,
        question: "Comment créer un compte ?",
        answer: "Pour créer un compte, cliquez sur l'icône de profil en haut à droite, puis sélectionnez 'S'inscrire'. Vous pouvez utiliser votre email ou continuer avec Google/Apple."
    },
    {
        id: 2,
        question: "Comment écouter la radio en arrière-plan ?",
        answer: "La radio TchadInfos continue de jouer même si vous quittez l'application ou verrouillez votre écran. Utilisez les contrôles dans le centre de notification pour mettre en pause."
    },
    {
        id: 3,
        question: "Puis-je télécharger les vidéos ?",
        answer: "Pour l'instant, le téléchargement direct n'est pas disponible. Vous pouvez toutefois sauvegarder des vidéos dans vos favoris pour les retrouver facilement."
    },
    {
        id: 4,
        question: "Comment changer le mode sombre/clair ?",
        answer: "Allez dans votre Profil > Préférences et activez l'interrupteur 'Mode Sombre'."
    },
    {
        id: 5,
        question: "Comment contacter la rédaction ?",
        answer: "Vous pouvez nous écrire directement via le bouton 'Contacter le Support' en bas de cette page ou par email à contact@tchadinfos.com."
    }
];

const AccordionItem = ({ item, styles, colors }: any) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={toggleExpand} style={styles.questionRow} activeOpacity={0.8}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons 
                    name={expanded ? "remove-circle-outline" : "add-circle-outline"} 
                    size={24} 
                    color={colors.neon} 
                />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                </View>
            )}
        </View>
    );
};

export default function FAQ() {
    const router = useRouter();
    const { COLORS } = useContext(ThemeContext);

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
        },
        subtitle: {
            fontSize: 16,
            color: COLORS.textLight,
            lineHeight: 22,
        },
        itemContainer: {
            backgroundColor: COLORS.card,
            borderRadius: 16,
            marginBottom: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        },
        questionRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
        },
        questionText: {
            fontSize: 16,
            fontWeight: "600",
            color: COLORS.text,
            flex: 1,
            marginRight: 10,
        },
        answerContainer: {
            paddingHorizontal: 20,
            paddingBottom: 20,
            paddingTop: 0,
        },
        answerText: {
            fontSize: 14,
            color: COLORS.textLight,
            lineHeight: 22,
        },
        contactSection: {
            marginTop: 40,
            alignItems: 'center',
            padding: 30,
            borderRadius: 24,
            backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: COLORS.glassBorder,
        },
        contactTitle: {
            fontSize: 18,
            fontWeight: "700",
            color: COLORS.text,
            marginBottom: 10,
        },
        contactText: {
            textAlign: 'center',
            color: COLORS.textLight,
            marginBottom: 20,
        },
        contactButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.neon,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 30,
        },
        contactButtonText: {
            color: '#000',
            fontWeight: "700",
            marginLeft: 8,
        }
    });

    return (
        <SafeScreenScondaire>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20, width: 40 }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Aide & FAQ</Text>
                    <Text style={styles.subtitle}>Questions fréquentes et support utilisateur</Text>
                </View>

                {FAQ_DATA.map(item => (
                    <AccordionItem key={item.id} item={item} styles={styles} colors={COLORS} />
                ))}

                {/* Contact Footer */}
                <View style={styles.contactSection}>
                    <Ionicons name="headset-outline" size={40} color={COLORS.neon} style={{ marginBottom: 15 }} />
                    <Text style={styles.contactTitle}>Besoin d'aide ?</Text>
                    <Text style={styles.contactText}>Notre équipe est disponible pour vous aider.</Text>
                    
                    <TouchableOpacity style={styles.contactButton} onPress={() => router.push("/pages/contact")}>
                        <Ionicons name="mail-outline" size={20} color="#000" />
                        <Text style={styles.contactButtonText}>Nous Contacter</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeScreenScondaire>
    );
}
