import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile() {
    const router = useRouter();
    const { COLORS } = useContext(ThemeContext);
    const { user } = useUser();

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [username, setUsername] = useState(user?.username || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // 1. Update First & Last Name
            await user.update({
                firstName,
                lastName,
            });

            // 2. Update Username ONLY if changed and not empty
            if (username && username !== user.username) {
                try {
                    await user.update({
                        username: username
                    });
                } catch (usernameErr: any) {
                    console.warn("Username update failed:", usernameErr);
                    
                    const errorString = JSON.stringify(usernameErr) + (usernameErr.message || "") + (usernameErr.errors ? JSON.stringify(usernameErr.errors) : "");
                    
                    if (errorString.includes("valid parameter") || errorString.includes("username")) {
                        Alert.alert("Info", "La modification du nom d'utilisateur n'est pas disponible pour moment.");
                    } else {
                         throw usernameErr; 
                    }
                }
            }

            Alert.alert("Succès", "Profil mis à jour avec succès !");
            router.back();
        } catch (err: any) {
            console.error("Update error:", err);
            const errorMessage = err.errors ? err.errors[0].message : "Une erreur est survenue.";
            Alert.alert("Erreur", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        // No permission request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
          base64: true,
        });
    
        if (!result.canceled && result.assets[0].base64) {
            setLoading(true);
            try {
                const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
                await user?.setProfileImage({
                    file: base64
                });
                Alert.alert("Succès", "Photo de profil mise à jour !");
            } catch (err: any) {
                console.error("Image upload error:", err);
                Alert.alert("Erreur", "Impossible de mettre à jour la photo.");
            } finally {
                setLoading(false);
            }
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
        avatarContainer: {
            alignItems: 'center',
            marginBottom: 30,
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: COLORS.neon,
        },
        editIcon: {
            position: 'absolute',
            bottom: 0,
            right: '35%',
            backgroundColor: COLORS.neon,
            padding: 8,
            borderRadius: 20,
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
        button: {
            backgroundColor: COLORS.neon,
            marginTop: 20,
            paddingVertical: 15,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: COLORS.neon,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        buttonText: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16,
        }
    });

    if (!user) {
         return (
             <SafeScreenScondaire>
                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                     <Text style={{ color: COLORS.text }}>Veuillez vous connecter pour éditer votre profil.</Text>
                 </View>
             </SafeScreenScondaire>
         )
    }

    return (
        <SafeScreenScondaire>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Éditer le Profil</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Image 
                        source={{ uri: user.imageUrl }} 
                        style={styles.avatar} 
                    />
                    <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
                        <Ionicons name="camera" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput 
                        style={styles.input} 
                        value={firstName} 
                        onChangeText={setFirstName} 
                        placeholder="Votre prénom"
                        placeholderTextColor={COLORS.textLight}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput 
                        style={styles.input} 
                        value={lastName} 
                        onChangeText={setLastName} 
                        placeholder="Votre nom"
                        placeholderTextColor={COLORS.textLight}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nom d'utilisateur</Text>
                    <TextInput 
                        style={styles.input} 
                        value={username} 
                        onChangeText={setUsername} 
                        placeholder="username"
                        placeholderTextColor={COLORS.textLight}
                        autoCapitalize="none"
                    />
                    <Text style={{ color: COLORS.textLight, fontSize: 12, marginTop: 5 }}>
                        Ce nom sera visible par les autres utilisateurs.
                    </Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                         <Text style={styles.buttonText}>Enregistrer</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </SafeScreenScondaire>
    );
}
