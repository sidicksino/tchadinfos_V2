import SafeScreen from "@/components/SafeScreen";
import { fetchTchadInfosVideos, YouTubeVideo } from "@/services/youtubeService";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getStyles } from "../../assets/styles/video.Style";
import Header from "../../components/header";
import VideoNewsScreen from "../../components/videoList";
import { ThemeContext } from "../../context/ThemeContext";

const video = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Header />
         {isLoading ? (
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                 <ActivityIndicator size="large" color={COLORS.primary} />
             </View>
        ) : (
            <VideoNewsScreen videoList={videos} />
        )}
      </View>
    </SafeScreen>
  );
};

export default video;
