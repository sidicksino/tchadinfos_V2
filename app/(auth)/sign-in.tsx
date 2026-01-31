import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from "@/context/ThemeContext";
import { getStyles } from "@/assets/styles/auth.Style";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) return
    setLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        alert("Connexion incomplète. Vérifiez vos informations.")
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      alert(err.errors ? err.errors[0].message : "Erreur de connexion");
    } finally {
        setLoading(false)
    }
  }

  return (
    <SafeScreenScondaire>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                        <View style={styles.logoContainer}>
                             <Ionicons name="finger-print-outline" size={40} color={COLORS.neon} />
                        </View>
                        <Text style={styles.title}>Bon retour !</Text>
                        <Text style={styles.subtitle}>Connectez-vous pour accéder à votre profil</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color={COLORS.textLight} />
                                <TextInput
                                    autoCapitalize="none"
                                    value={emailAddress}
                                    placeholder="exemple@email.com"
                                    placeholderTextColor={COLORS.textLight}
                                    onChangeText={(email) => setEmailAddress(email)}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
                                <TextInput
                                    value={password}
                                    placeholder="••••••••"
                                    placeholderTextColor={COLORS.textLight}
                                    secureTextEntry={true}
                                    onChangeText={(pass) => setPassword(pass)}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            onPress={onSignInPress} 
                            style={styles.button}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#000" />
                            ) : (
                                <Text style={styles.buttonText}>Se connecter</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Pas encore de compte ?</Text>
                        <Link href="/sign-up" asChild>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>S'inscrire</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeScreenScondaire>
  )
}
