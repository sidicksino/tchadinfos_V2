import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from "@/context/ThemeContext";
import { FavoritesContext } from "@/context/FavoritesContext";
import { getStyles } from "@/assets/styles/video.Style";
import { YouTubeVideo } from "@/services/youtubeService";

type VideoCardProps = {
    video: YouTubeVideo;
    onPress: (video: YouTubeVideo) => void;
};

const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
    const { COLORS } = useContext(ThemeContext);
    const styles = getStyles(COLORS);
    const favoritesContext = useContext(FavoritesContext);
    
    // Safety check if provider is missing (though we wrapped it)
    const isFav = favoritesContext?.isVideoFavorite(video.id) || false;
    const toggleFav = () => favoritesContext?.toggleVideoFavorite(video);

    // Format date if needed, or use publishedAt directly
    const formattedDate = new Date(video.publishedAt).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <TouchableOpacity 
            style={styles.cardContainer} 
            activeOpacity={0.9}
            onPress={() => onPress(video)}
        >
            {/* Thumbnail Section */}
            <View style={styles.thumbnailContainer}>
                <Image 
                    source={{ uri: video.thumbnail }} 
                    style={styles.thumbnail} 
                />
                <View style={styles.playOverlay}>
                    <View style={styles.playIcon}>
                        <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 4 }} />
                    </View>
                </View>
                {/* Fallback duration if API doesn't provide it, or assume variable. 
                    video.duration is not in standard YouTubeVideo interface from prev context, 
                    checking usage... if mapped, good. If not, safe fallback. 
                */}
                <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>VIDÉO</Text> 
                </View>

                {/* Favorite Button Overlay */}
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 20,
                        padding: 8,
                    }}
                    onPress={toggleFav}
                >
                    <Ionicons 
                        name={isFav ? "heart" : "heart-outline"} 
                        size={20} 
                        color={isFav ? "#ff4757" : "#fff"} 
                    />
                </TouchableOpacity>
            </View>

            {/* Info Section */}
            <View style={styles.infoContainer}>
                <Text style={styles.categoryLabel}>Actualités</Text>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{formattedDate}</Text>
                    <Text style={styles.metaText}> • </Text>
                    <Text style={styles.metaText}>TchadInfos TV</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default VideoCard;
