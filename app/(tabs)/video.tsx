import SafeScreen from "@/components/SafeScreen";
import { fetchTchadInfosVideos, YouTubeVideo } from "@/services/youtubeService";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, FlatList, TouchableOpacity, Text } from "react-native";
import VideoCard from "@/components/VideoCard";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import { getStyles } from "../../assets/styles/video.Style";
import Header from "../../components/header";
import { ThemeContext } from "../../context/ThemeContext";

const VIDEO_CATEGORIES = ["À la une", "Politique", "Société", "Sport", "Tech", "Culture"];

const VideoPage = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("À la une");
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTchadInfosVideos();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoPress = (video: YouTubeVideo) => {
      if (video.id) {
          setCurrentVideoId(video.id);
          setModalVisible(true);
      }
  };

  const renderCategory = ({ item }: { item: string }) => (
      <TouchableOpacity 
          style={[styles.categoryPill, activeCategory === item && styles.categoryPillActive]}
          onPress={() => setActiveCategory(item)}
      >
          <Text style={[styles.categoryText, activeCategory === item && styles.categoryTextActive]}>
              {item}
          </Text>
      </TouchableOpacity>
  );

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Header />
        </View>

        {/* Categories Filter */}
        <View style={{ height: 50 }}>
            <FlatList 
                data={VIDEO_CATEGORIES}
                renderItem={renderCategory}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
            />
        </View>

         {isLoading ? (
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                 <ActivityIndicator size="large" color={COLORS.primary} />
             </View>
        ) : (
            <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <VideoCard video={item} onPress={handleVideoPress} />
                )}
                contentContainerStyle={styles.feedContainer}
                showsVerticalScrollIndicator={false}
            />
        )}
        
        <VideoPlayerModal 
            visible={modalVisible} 
            videoId={currentVideoId} 
            onClose={() => setModalVisible(false)} 
        />
      </View>
    </SafeScreen>
  );
};

export default VideoPage;
