import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { YouTubeVideo } from "@/services/youtubeService";

export interface FavoritesContextType {
  videoBookmarks: YouTubeVideo[];
  toggleVideoFavorite: (video: YouTubeVideo) => Promise<void>;
  isVideoFavorite: (videoId: string) => boolean;
  newsBookmarks: string[];
  toggleNewsFavorite: (articleId: string) => Promise<void>;
  isNewsFavorite: (articleId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [videoBookmarks, setVideoBookmarks] = useState<YouTubeVideo[]>([]);
  const [newsBookmarks, setNewsBookmarks] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedVideos = await AsyncStorage.getItem("video_bookmarks");
      if (storedVideos) setVideoBookmarks(JSON.parse(storedVideos));
      
      const storedNews = await AsyncStorage.getItem("bookmark"); // Keeping existing key
      if (storedNews) setNewsBookmarks(JSON.parse(storedNews));
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  };

  const toggleVideoFavorite = async (video: YouTubeVideo) => {
    try {
      let updated = [...videoBookmarks];
      const index = updated.findIndex((v) => v.id === video.id);
      if (index >= 0) updated.splice(index, 1);
      else updated.push(video);
      setVideoBookmarks(updated);
      await AsyncStorage.setItem("video_bookmarks", JSON.stringify(updated));
    } catch (e) { console.error(e); }
  };

  const toggleNewsFavorite = async (articleId: string) => {
      try {
          let updated = [...newsBookmarks];
          const index = updated.indexOf(articleId);
          if (index >= 0) updated.splice(index, 1);
          else updated.push(articleId);
          setNewsBookmarks(updated);
          await AsyncStorage.setItem("bookmark", JSON.stringify(updated));
      } catch (e) { console.error(e); }
  };

  const isVideoFavorite = (videoId: string) => videoBookmarks.some((v) => v.id === videoId);
  const isNewsFavorite = (articleId: string) => newsBookmarks.includes(articleId);

  return (
    <FavoritesContext.Provider value={{ 
        videoBookmarks, toggleVideoFavorite, isVideoFavorite,
        newsBookmarks, toggleNewsFavorite, isNewsFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
