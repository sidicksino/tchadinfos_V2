import { getStyles } from "@/assets/styles/live.Style";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Animated, ActivityIndicator, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import LiveVideoPlayer from "@/components/LiveVideoPlayer";
import { useRadio } from "@/hooks/useRadio";

const Live = () => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const [mode, setMode] = useState<'video' | 'radio'>('video');

  // Pulse Animation for Live Dot
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // STREAM URLS
  // Sourced from .env file (See README.md for setup)
  const VIDEO_STREAM_URL = process.env.EXPO_PUBLIC_TV_STREAM_URL || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"; 
  const RADIO_STREAM_URL = process.env.EXPO_PUBLIC_RADIO_STREAM_URL || "https://direct.franceinfo.fr/live/franceinfo-midfi.mp3";
  
  const { isPlaying: isRadioPlaying, toggleRadio, isLoading: isRadioLoading } = useRadio(RADIO_STREAM_URL);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const UpcomingPrograms = [
      { id: 1, time: '14:00', title: 'Le Journal', host: 'TchadInfos' },
      { id: 2, time: '14:30', title: 'Débat Politique', host: 'Invité Spécial' },
      { id: 3, time: '16:00', title: 'Sport Plus', host: 'Redaction Sport' },
      { id: 4, time: '18:00', title: 'Culture & Avenir', host: 'Culture Team' },
  ];

  return (
    <SafeScreenScondaire>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Direct</Text>
            <View style={styles.liveBadge}>
                <Animated.View style={[styles.liveDot, { opacity: fadeAnim }]} />
                <Text style={styles.liveText}>EN DIRECT</Text>
            </View>
        </View>

        {/* Toggle (Radio / TV) */}
        <View style={styles.toggleContainer}>
            <TouchableOpacity 
                style={[styles.toggleButton, mode === 'video' && styles.toggleActive]}
                onPress={() => setMode('video')}
            >
                <Ionicons name="videocam" size={18} color={mode === 'video' ? '#000' : COLORS.text} />
                <Text style={[styles.toggleText, mode === 'video' && styles.toggleTextActive]}>TchadInfos TV</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.toggleButton, mode === 'radio' && styles.toggleActive]}
                onPress={() => setMode('radio')}
            >
                <Ionicons name="radio" size={18} color={mode === 'radio' ? '#000' : COLORS.text} />
                <Text style={[styles.toggleText, mode === 'radio' && styles.toggleTextActive]}>Radio FM</Text>
            </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Player Section */}
            <View style={styles.playerContainer}>
                {mode === 'video' ? (
                    <LiveVideoPlayer streamUrl={VIDEO_STREAM_URL} />
                ) : (
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                         <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1478737270239-2f52b27fa34e?q=80&w=2070&auto=format&fit=crop' }} 
                            style={{ ...StyleSheet.absoluteFillObject, opacity: 0.6 }}
                            resizeMode="cover"
                        />
                        <View style={styles.playerOverlay}>
                            {isRadioLoading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <TouchableOpacity style={styles.playButton} onPress={toggleRadio}>
                                    <Ionicons name={isRadioPlaying ? "pause" : "play"} size={32} color="#fff" style={{ marginLeft: isRadioPlaying ? 0 : 4 }} />
                                </TouchableOpacity>
                            )}
                            <Text style={{ color: '#fff', marginTop: 10, fontWeight: '600', letterSpacing: 1 }}>
                                {isRadioPlaying ? 'ON AIR • 98.5 FM' : 'TOUCHER POUR ÉCOUTER'}
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
                <Text style={styles.programTitle}>
                    {mode === 'video' ? 'Le Journal de 13h' : 'Antenne Directe 98.5 FM'}
                </Text>
                <Text style={styles.programTime}>
                    13:00 - 14:00 • {mode === 'video' ? 'Information' : 'Musique & Info'}
                </Text>

                {/* Upcoming */}
                <View style={styles.upcomingContainer}>
                    <Text style={styles.sectionHeader}>À Suivre</Text>
                    {UpcomingPrograms.map((prog) => (
                        <View key={prog.id} style={styles.upcomingItem}>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>{prog.time}</Text>
                            </View>
                            <View style={styles.programInfo}>
                                <Text style={styles.programName}>{prog.title}</Text>
                                <Text style={styles.programHost}>{prog.host}</Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="notifications-outline" size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </View>
        </ScrollView>
      </View>
    </SafeScreenScondaire>
  );
};

export default Live;
