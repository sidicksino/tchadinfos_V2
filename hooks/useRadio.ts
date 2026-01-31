import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export function useRadio(streamUrl: string) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function toggleRadio() {
        try {
            if (sound) {
                if (isPlaying) {
                    await sound.pauseAsync();
                    setIsPlaying(false);
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                }
            } else {
                setIsLoading(true);
                // Configure audio for playback (allows background audio on iOS)
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    shouldDuckAndroid: true,
                });

                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: streamUrl },
                    { shouldPlay: true }
                );

                setSound(newSound);
                setIsPlaying(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error toggling radio:", error);
            setIsLoading(false);
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return { isPlaying, toggleRadio, isLoading };
}
