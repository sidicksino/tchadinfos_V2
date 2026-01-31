import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useOAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import * as WebBrowser from 'expo-web-browser'
import { ThemeContext } from "@/context/ThemeContext";

WebBrowser.maybeCompleteAuthSession()

export default function SocialAuth() {
    useWarmUpBrowser()
    const router = useRouter()
    const { COLORS } = React.useContext(ThemeContext);

    const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: startAppleFlow } = useOAuth({ strategy: 'oauth_apple' })

    const onSelectAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
        try {
            const startFlow = strategy === 'oauth_google' ? startGoogleFlow : startAppleFlow
            const { createdSessionId, setActive } = await startFlow()

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
                router.replace('/(tabs)')
            }
        } catch (err) {
            console.warn("OAuth error", err)
        }
    }

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        line: {
            flex: 1,
            height: 1,
            backgroundColor: COLORS.border || 'rgba(255,255,255,0.2)',
        },
        text: {
            color: COLORS.textLight,
            paddingHorizontal: 10,
            fontSize: 14,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
        },
        button: {
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.card || 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.text}>Ou continuer avec</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => onSelectAuth('oauth_google')} style={styles.button}>
                     <Ionicons name="logo-google" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSelectAuth('oauth_apple')} style={styles.button}>
                     <Ionicons name="logo-apple" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
