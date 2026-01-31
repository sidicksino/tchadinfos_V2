import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { YouTubeVideo } from "@/services/youtubeService";

export interface FavoritesContextType {
  videoBookmarks: YouTubeVideo[];
  toggleVideoFavorite: (video: YouTubeVideo) => Promise<void>;
  isVideoFavorite: (videoId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [videoBookmarks, setVideoBookmarks] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("video_bookmarks");
      if (stored) setVideoBookmarks(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  };

  const toggleVideoFavorite = async (video: YouTubeVideo) => {
    try {
      let updated = [...videoBookmarks];
      const index = updated.findIndex((v) => v.id === video.id);

      if (index >= 0) {
        updated.splice(index, 1); // Remove
      } else {
        updated.push(video); // Add
      }

      setVideoBookmarks(updated);
      await AsyncStorage.setItem("video_bookmarks", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to toggle favorite", e);
    }
  };

  const isVideoFavorite = (videoId: string) => {
    return videoBookmarks.some((v) => v.id === videoId);
  };

  return (
    <FavoritesContext.Provider value={{ videoBookmarks, toggleVideoFavorite, isVideoFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
