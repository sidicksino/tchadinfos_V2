import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { ThemeContext } from "@/context/ThemeContext";
import { getStyles } from "@/assets/styles/auth.Style";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const { COLORS } = React.useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Helper to get friendly error message
  const getErrorMessage = (err: any) => {
    if (err.errors && err.errors.length > 0) {
        const code = err.errors[0].code;
        switch (code) {
            case "form_identifier_exists": return "Ce compte existe déjà. Connectez-vous.";
            case "form_password_pwned": return "Sécurité : Ce mot de passe a été trouvé dans une fuite de données. Choisissez-en un autre.";
            case "form_password_length_too_short": return "Le mot de passe doit contenir au moins 8 caractères.";
            case "form_param_format_invalid": return "Format d'email incorrect.";
            case "verification_expired": return "Le code a expiré. Veuillez recommencer.";
            case "verification_failed": return "Code de vérification incorrect.";
            case "too_many_attempts": return "Trop de tentatives. Veuillez patienter un moment.";
            case "verification_already_verified": return "already_verified"; // Special flag
            default: return err.errors[0].longMessage || err.errors[0].message;
        }
    }
    return "Une erreur est survenue.";
  };

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    if (!emailAddress || !password) {
        alert("Veuillez remplir tous les champs.")
        return
    }

    if (!emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert("Veuillez entrer une adresse email valide.")
        return
    }

    if (password.length < 8) {
        alert("Le mot de passe doit contenir au moins 8 caractères.")
        return
    }

    setLoading(true)

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      console.warn("Sign Up Error:", JSON.stringify(err, null, 2))
      const msg = getErrorMessage(err);
      
      if (msg === "Ce compte existe déjà. Connectez-vous.") {
          // Optional: navigate to sign-in?
          alert(msg);
          // router.replace("/sign-in"); // Maybe too aggressive
      } else {
          alert(msg);
      }
    } finally {
        setLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return
    setLoading(true)

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/(tabs)')
      } else if (signUpAttempt.status === 'missing_requirements') {
          console.error(JSON.stringify(signUpAttempt, null, 2))
          alert("Inscription incomplète : " + signUpAttempt.missingFields.join(", ") + " manquant(s). Vérifiez votre configuration Clerk (désactivez Phone Number).")
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        alert("Vérification incomplète. Code incorrect ? Statut: " + signUpAttempt.status)
      }
    } catch (err: any) {
      console.warn("Verify Error:", JSON.stringify(err, null, 2))
      
      const msg = getErrorMessage(err);

      // Handle "already verified" case specially
      if (msg === "already_verified") {
         if (signUp.status === 'complete' && signUp.createdSessionId) {
             await setActive({ session: signUp.createdSessionId })
             router.replace('/(tabs)')
         } else {
             // Fallback: If we can't activate session, tell them to login
             alert("Ce compte est déjà vérifié. Veuillez vous connecter.")
             router.replace('/sign-in')
         }
         return;
      }

      alert(msg)
    } finally {
        setLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <SafeScreenScondaire>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
             <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                         <View style={styles.logoContainer}>
                             <Ionicons name="shield-checkmark-outline" size={40} color={COLORS.neon} />
                        </View>
                        <Text style={styles.title}>Vérification</Text>
                        <Text style={styles.subtitle}>Un code a été envoyé à {emailAddress}</Text>
                    </View>

                    <View style={styles.formContainer}>
                         <View style={styles.inputContainer}>
                            <Text style={styles.label}>Code de vérification</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="key-outline" size={20} color={COLORS.textLight} />
                                <TextInput
                                    value={code}
                                    placeholder="123456"
                                    placeholderTextColor={COLORS.textLight}
                                    onChangeText={(code) => setCode(code)}
                                    style={styles.input}
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                        <TouchableOpacity onPress={onVerifyPress} style={styles.button} disabled={loading}>
                            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Vérifier</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
             </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeScreenScondaire>
    )
  }

  return (
    <SafeScreenScondaire>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerContainer}>
                         <View style={styles.logoContainer}>
                             <Ionicons name="person-add-outline" size={40} color={COLORS.neon} />
                        </View>
                        <Text style={styles.title}>Créer un compte</Text>
                        <Text style={styles.subtitle}>Rejoignez la communauté TchadInfos</Text>
                    </View>

                    <View style={styles.formContainer}>
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

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
                                <TextInput
                                    value={password}
                                    placeholder="••••••••"
                                    placeholderTextColor={COLORS.textLight}
                                    secureTextEntry={true}
                                    onChangeText={(password) => setPassword(password)}
                                    style={styles.input}
                                />
                            </View>
                            <Text style={{color: COLORS.textLight, fontSize: 12, marginLeft: 4}}>
                                Minimum 8 caractères
                            </Text>
                        </View>

                        <TouchableOpacity onPress={onSignUpPress} style={styles.button} disabled={loading}>
                             {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Continuer</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Déjà un compte ?</Text>
                        <Link href="/sign-in" asChild>
                             <TouchableOpacity>
                                <Text style={styles.linkText}>Se connecter</Text>
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
