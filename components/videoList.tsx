import { YouTubeVideo } from "@/services/youtubeService";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

import { FavoritesContext } from "@/context/FavoritesContext";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  videoList: YouTubeVideo[];
};

const VideoNewsScreen = ({ videoList }: Props) => {
  const [selectedVideoId, setSelectedVideoId] = React.useState<string | null>(null);
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const context = useContext(FavoritesContext);
  
  const { isVideoFavorite, toggleVideoFavorite } = context || {
      isVideoFavorite: () => false,
      toggleVideoFavorite: async () => {} 
  };
  
  const insets = useSafeAreaInsets();

  // Dynamic Styles based on Theme
  const dynamicStyles = {
      container: {
          backgroundColor: isDarkMode ? COLORS.background : "#f5f5f5",
      },
      card: {
          backgroundColor: isDarkMode ? COLORS.card : "white",
          shadowColor: isDarkMode ? "#000" : "#000",
          shadowOpacity: isDarkMode ? 0.3 : 0.1,
          borderColor: isDarkMode ? COLORS.glassBorder : 'transparent',
          borderWidth: isDarkMode ? 1 : 0,
      },
      title: {
          color: isDarkMode ? COLORS.text : "#333",
      },
      source: {
          color: isDarkMode ? COLORS.textLight : "#777",
      },
      backButton: {
          backgroundColor: isDarkMode ? COLORS.glassSurface : "#f0f0f0",
      }
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <FlatList
        data={videoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.videoCard, dynamicStyles.card]}>
            {/* Thumbnail cliquable */}
            <TouchableOpacity
              onPress={() => setSelectedVideoId(item.id)}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: item.thumbnail,
                }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
               {/* Play Icon Overlay to indicate clickability */}
               <View style={styles.playIconOverlay}>
                  <Ionicons name="play-circle" size={50} color="white" />
               </View>
            </TouchableOpacity>

            <View style={styles.flexFavorite}>
              <Text style={[styles.title, dynamicStyles.title]} numberOfLines={2}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => toggleVideoFavorite(videoList.find(v => v.id === item.id) || item)}
                style={[styles.backButton, dynamicStyles.backButton]}
              >
                <Ionicons 
                    name={isVideoFavorite(item.id) ? "heart" : "heart-outline"} 
                    color={isVideoFavorite(item.id) ? (COLORS.neon || "red") : (isDarkMode ? COLORS.text : "#000")} 
                    size={22} 
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.source, dynamicStyles.source]}>
              {item.channelTitle} -{" "}
              {new Date(item.publishedAt).toLocaleDateString("fr-FR")}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* MODAL PLEIN ÉCRAN */}
      <Modal
        visible={!!selectedVideoId}
        animationType="slide"
        onRequestClose={() => setSelectedVideoId(null)}
        transparent={false}
      >
        <View style={{ flex: 1, backgroundColor: "#000", justifyContent: 'center' }}>
          {/* Bouton Fermer — FIXÉ en haut, toujours visible */}
          <TouchableOpacity
            style={styles.closeButtonOverlay}
            onPress={() => setSelectedVideoId(null)}
            activeOpacity={0.7}
          >
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>✕ Fermer</Text>
            </View>
          </TouchableOpacity>

          {/* Youtube Native Player */}
          {selectedVideoId && (
            <View style={{ width: '100%' }}>
                <YoutubePlayer
                height={230} // 16:9 ratio approx for width
                play={true}
                videoId={selectedVideoId}
                onChangeState={(state: string) => {
                    if (state === "ended") {
                        // Optional
                    }
                }}
                />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 0, // Handled by contentContainerStyle
  },
  videoCard: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  thumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  playIconOverlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    lineHeight: 20,
    width: '85%' // leave space for heart button
  },
  source: {
    fontSize: 12,
    marginVertical: 4,
  },
  
  /* ———— MODAL STYLE ———— */
  closeButtonOverlay: {
    position: "absolute",
    top: 50, // Adjusted for typical safe area
    left: 20,
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
  },
  closeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 59, 48, 0.9)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },

  flexFavorite: {
    flexDirection: "row",
    justifyContent: "space-between", 
    paddingVertical: 10,
    gap: 10,
    marginRight: 0,
    alignItems: 'flex-start'
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoNewsScreen;