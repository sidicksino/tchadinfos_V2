import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

export default function Contact() {
    const router = useRouter();
    const { COLORS } = useContext(ThemeContext);
    const { user } = useUser();

    const [name, setName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || "");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!name || !email || !subject || !message) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);

        const data = {
            service_id: 'service_c4vcw6c',
            template_id: 'template_1b290dh',
            user_id: 'DGu360jLgTiYGNW6H',
            template_params: {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            }
        };

        try {
            await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'origin': 'http://localhost',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
                }
            });
            Alert.alert("Succès", "Votre message a été envoyé avec succès !");
            router.back();
        } catch (error: any) {
            console.error("EmailJS Error:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Response Status:", error.response.status);
                Alert.alert("Erreur", `L'envoi a échoué: ${error.response.data || "Erreur inconnue"}`);
            } else {
                Alert.alert("Erreur", "Problème de connexion internet ou configuration.");
            }
        } finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            marginTop: 10,
        },
        title: {
            fontSize: 24,
            fontWeight: "800",
            color: COLORS.text,
            marginLeft: 15,
        },
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            color: COLORS.textLight,
            marginBottom: 8,
            fontSize: 14,
            fontWeight: '600',
        },
        input: {
            backgroundColor: COLORS.card,
            color: COLORS.text,
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLORS.glassBorder,
            fontSize: 16,
        },
        textArea: {
            height: 120,
            textAlignVertical: 'top',
            paddingTop: 12,
        },
        button: {
            backgroundColor: COLORS.neon,
            marginTop: 10,
            paddingVertical: 15,
            borderRadius: 12,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            shadowColor: COLORS.neon,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        buttonText: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16,
            marginLeft: 10,
        },
        infoText: {
            marginTop: 20,
            textAlign: 'center',
            color: COLORS.textLight,
            fontSize: 12,
            lineHeight: 18,
        }
    });

    return (
        <SafeScreenScondaire>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Contactez-nous</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nom complet</Text>
                    <TextInput 
                        style={styles.input} 
                        value={name} 
                        onChangeText={setName} 
                        placeholder="Votre nom"
                        placeholderTextColor={COLORS.textLight}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input} 
                        value={email} 
                        onChangeText={setEmail} 
                        placeholder="votre@email.com"
                        placeholderTextColor={COLORS.textLight}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sujet</Text>
                    <TextInput 
                        style={styles.input} 
                        value={subject} 
                        onChangeText={setSubject} 
                        placeholder="Sujet de votre message"
                        placeholderTextColor={COLORS.textLight}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Message</Text>
                    <TextInput 
                        style={[styles.input, styles.textArea]} 
                        value={message} 
                        onChangeText={setMessage} 
                        placeholder="Écrivez votre message ici..."
                        placeholderTextColor={COLORS.textLight}
                        multiline
                        numberOfLines={5}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <>
                             <Ionicons name="send" size={20} color="#000" />
                             <Text style={styles.buttonText}>Envoyer</Text>
                        </>
                    )}
                </TouchableOpacity>

                <Text style={styles.infoText}>
                    En envoyant ce message, vous acceptez d'être contacté par notre équipe support. Nous répondons généralement sous 24h.
                </Text>

            </ScrollView>
        </SafeScreenScondaire>
    );
}
