import { YouTubeVideo } from "@/services/youtubeService";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Remplace SafeAreaView par useSafeAreaInsets
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

type Props = {
  videoList: YouTubeVideo[];
};

const VideoNewsScreen = ({ videoList }: Props) => {
  const [selectedVideoId, setSelectedVideoId] = React.useState<string | null>(null);
  const [favorites, setFavorites] = React.useState<YouTubeVideo[]>([]);
  
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  // Load favorites when screen focuses or mounts
  React.useEffect(() => {
    if (isFocused) {
        loadFavorites();
    }
  }, [isFocused]);

  const loadFavorites = async () => {
    try {
        const stored = await AsyncStorage.getItem("video_bookmarks");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    } catch (e) {
        console.error("Failed to load video favorites", e);
    }
  };

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = async (video: YouTubeVideo) => {
    try {
        let newFavorites = [...favorites];
        if (isFavorite(video.id)) {
            newFavorites = newFavorites.filter((fav) => fav.id !== video.id);
        } else {
            newFavorites.push(video);
        }
        setFavorites(newFavorites);
        await AsyncStorage.setItem("video_bookmarks", JSON.stringify(newFavorites));
    } catch (e) {
        console.error("Failed to toggle favorite", e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
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
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={styles.backButton}
              >
                <Ionicons 
                    name={isFavorite(item.id) ? "heart" : "heart-outline"} 
                    color={isFavorite(item.id) ? "red" : "#000"} 
                    size={22} 
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.source}>
              {item.channelTitle} -{" "}
              {new Date(item.publishedAt).toLocaleDateString("fr-FR")}
            </Text>
          </View>
        )}
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
                        // Optional: close modal when video ends?
                        // setSelectedVideoId(null);
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
    backgroundColor: "#f5f5f5",
    marginBottom: 50,
  },
  videoCard: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
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
    color: "#333",
    lineHeight: 20,
    width: '85%' // leave space for heart button
  },
  source: {
    fontSize: 12,
    color: "#777",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoNewsScreen;