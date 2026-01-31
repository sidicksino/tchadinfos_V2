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

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    setLoading(true)

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      alert(err.errors ? err.errors[0].message : "Erreur d'inscription")
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
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
        alert("Vérification incomplète. Code incorrect ?")
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      alert(err.errors ? err.errors[0].message : "Erreur de vérification")
    } finally {
        setLoading(false)
    }
  }

  if (pendingVerification) {
    return (
      <SafeScreenScondaire>
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
