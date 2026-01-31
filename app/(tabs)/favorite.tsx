import SafeScreen from "@/components/SafeScreen";
import Loading from "@/components/loading";
import { NewsItem } from "@/components/news";
import VideoNewsScreen from "@/components/videoList";
import { YouTubeVideo } from "@/services/youtubeService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { getStyles } from "../../assets/styles/favorite.Style";
import Header from "../../components/header";
import { ThemeContext } from "../../context/ThemeContext";
import { FavoritesContext } from "../../context/FavoritesContext"; // Import Context
import { Ionicons } from "@expo/vector-icons";

const Favorite = () => {
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(COLORS); // Use new external styles
  const { videoBookmarks = [], newsBookmarks = [] } = useContext(FavoritesContext) || {}; // Handle undefined context

  const [selected, setSelected] = useState<"option1" | "option2">("option1");
  const [fetchedNews, setFetchedNews] = useState<any[]>([]);
  const [fetchedVideos, setFetchedVideos] = useState<YouTubeVideo[]>([]); // We might store full objects in context for videos?
  
  // Note: For videos, the Context stores ID mostly? 
  // checking FavoritesContext implementation... usually it stores objects for Videos?
  // If context stores objects, we can use them directly.
  // If context stores IDs, we need to fetch. 
  // Let's assume for now we might need to fetch News, but Videos might be objects if we stored them that way.
  // Actually, let's Stick to the existing logic of fetching News by ID, but using the IDs from Context.

  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  // Sync News
  useEffect(() => {
    if (isFocused && selected === "option1") {
       fetchNewsBatch();
    }
  }, [isFocused, selected, newsBookmarks]);

  // Sync Videos
  // If FavoritesContext already has video objects, we can just use them!
  // Let's verify if `videoBookmarks` are items or IDs. 
  // Based on my previous `FavoritesContext` creation (Step 1090), I used `YouTubeVideo[]`.
  // So `videoBookmarks` IS the data. No need to fetch.

  const fetchNewsBatch = async () => {
    if (newsBookmarks.length === 0) {
        setFetchedNews([]);
        return;
    }
    try {
      setIsLoading(true);
      // newsBookmarks is array of IDs (strings)
      const query_string = newsBookmarks.join(",");
      // API call to get details for these IDs
      // Note: newsdata.io might have limits or specific format. 
      // If the list is long, might need pagination or careful handling.
      if (query_string) {
        const response = await axios.get(
            `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
        );
        setFetchedNews(response.data.results || []);
      }
    } catch (error) {
      console.error("Error fetching fav news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Header />

        {/* New Segmented Control Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selected === "option1" && styles.tabActive]}
            onPress={() => setSelected("option1")}
          >
            <Text style={[styles.tabText, selected === "option1" && styles.tabTextActive]}>
              Actualités
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selected === "option2" && styles.tabActive]}
            onPress={() => setSelected("option2")}
          >
            <Text style={[styles.tabText, selected === "option2" && styles.tabTextActive]}>
              Vidéos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.content}>
          {selected === "option1" && (
            <>
              {isLoading ? (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="small" color={COLORS.primary} />
                </View>
              ) : fetchedNews.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="newspaper-outline" size={48} color={COLORS.glassBorder || '#ccc'} />
                    <Text style={styles.emptyText}>Aucun article favori</Text>
                </View>
              ) : (
                <FlatList
                  data={fetchedNews}
                  keyExtractor={(_, index) => `list_item${index}`}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  renderItem={({ item, index }) => (
                    <Link href={`/news/${item.article_id}`} asChild key={index}>
                      <TouchableOpacity style={{ paddingHorizontal: 20 }}>
                        <NewsItem item={item} />
                      </TouchableOpacity>
                    </Link>
                  )}
                />
              )}
            </>
          )}

          {selected === "option2" && (
             <>
             {videoBookmarks.length === 0 ? ( // Direct use of Context data
               <View style={styles.emptyContainer}>
                    <Ionicons name="film-outline" size={48} color={COLORS.glassBorder || '#ccc'} />
                    <Text style={styles.emptyText}>Aucune vidéo favorite</Text>
               </View>
             ) : (
                // Reuse the same Video List component!
                // Make sure VideoNewsScreen handles style overrides if needed, or is generic enough.
                <VideoNewsScreen videoList={videoBookmarks} />
             )}
           </>
          )}
        </View>
      </View>
    </SafeScreen>
  );
};

export default Favorite;
