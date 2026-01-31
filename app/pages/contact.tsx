import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { useUser } from "@clerk/clerk-expo";

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
        
        // Simulate network delay for better UX feeling
        setTimeout(() => {
            const mailtoUrl = `mailto:contact@tchadinfos.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            Linking.canOpenURL(mailtoUrl).then(supported => {
                if (supported) {
                    Linking.openURL(mailtoUrl);
                    Alert.alert("Succès", "Votre application de messagerie a été ouverte.");
                    router.back();
                } else {
                    Alert.alert("Erreur", "Aucune application de messagerie n'est installée.");
                }
            }).catch(err => console.error("An error occurred", err))
            .finally(() => setLoading(false));

        }, 1000);
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
