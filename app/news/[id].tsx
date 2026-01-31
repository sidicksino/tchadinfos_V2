import SafeScreen from "@/components/SafeScreen";
import Loading from "@/components/loading";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import Moment from "moment";
import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NewsDataType } from "../../types/index";
import { ThemeContext } from "@/context/ThemeContext";
import { getStyles } from "../../assets/styles/newsDetails.Style";

type Props = {};

const NewsDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { COLORS, isDarkMode } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  
  /* Existing code ... */
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [relatedNews, setRelatedNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    getNews();
    getRelatedNews();
  }, []);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching breaking news:", err.message);
    }
  };

  // Fetch related news (generic latest for now, can be category based)
  const getRelatedNews = async () => {
      try {
        // Fetch 5 latest news to show as "Read Also"
        // In a real app, use &category=... based on current news category
        const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&image=1&removeduplicate=1&size=5`;
        const response = await axios.get(URL);
        if (response && response.data) {
          // Filter out current article if present
          const filtered = response.data.results.filter((item: NewsDataType) => item.article_id !== id);
          setRelatedNews(filtered);
        }
      } catch (err: any) {
          console.log("Error fetching related:", err.message);
      }
  };

  const renderBookmark = async (newsId: string) => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      const res: string[] = token ? JSON.parse(token) : [];
      setBookmark(res.includes(newsId)); 
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const saveBookmark = async (newsId: string) => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      const res: string[] = token ? JSON.parse(token) : [];

      if (!res.includes(newsId)) {
        res.push(newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(res));
        setBookmark(true);
        // alert("News Saved!"); // Removed alert for smoother UX, maybe add toast later
      } else {
        // alert("Already bookmarked!");
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
    }
  };

  const removeBookmark = async (newsId: string) => {
    try {
      const token = await AsyncStorage.getItem("bookmark");
      let res: string[] = token ? JSON.parse(token) : [];

      res = res.filter((id) => id !== newsId);
      await AsyncStorage.setItem("bookmark", JSON.stringify(res));
      setBookmark(false);
      // alert("News removed from bookmarks!");
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && news.length > 0) {
      renderBookmark(news[0].article_id);
      incrementReadCount();
    }
  }, [isLoading, news]);

  const incrementReadCount = async () => {
    try {
        const current = await AsyncStorage.getItem("total_reads");
        const newVal = (current ? parseInt(current) : 0) + 1;
        await AsyncStorage.setItem("total_reads", newVal.toString());
    } catch (e) { console.error(e); }
  };

  return (
    <SafeScreen>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Image Hero Section with Tech Gradient */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: news[0].image_url }} style={styles.image} />
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.gradient}
                />
                
                {/* Header Buttons (Glass) - Absolute on Image */}
                <View style={styles.headerSearche}>
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="arrow-back"
                      size={24}
                      color="#fff" // Optimized for dark overlay
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      bookmark
                        ? removeBookmark(news[0].article_id)
                        : saveBookmark(news[0].article_id);
                    }}
                    style={styles.backButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={bookmark ? "bookmark" : "bookmark-outline"}
                      color={bookmark ? (COLORS.neon || "#00d4ff") : "#fff"}
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
               <Text style={styles.datailsDate}>
                  {Moment(news[0].pubDate).format("MMMM Do YYYY, h:mm a")}
               </Text>
               
               <Text style={styles.title}>{news[0].title}</Text>
               
               {news[0].description ? (
                 <Text style={styles.description}>{news[0].description}</Text>
               ) : null}
               
               <Text style={styles.contentText}>{news[0].content}</Text>

               {/* Read Also Section */}
               {relatedNews.length > 0 && (
                   <View style={{ marginTop: 30 }}>
                       <Text style={{ 
                           fontSize: 18, 
                           fontWeight: '700', 
                           color: COLORS.text, 
                           marginBottom: 15,
                           fontFamily: 'System'
                       }}>
                           Articles Similaires
                       </Text>
                       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                           {relatedNews.map((item, index) => (
                               <TouchableOpacity 
                                   key={index}
                                   onPress={() => router.push(`/news/${item.article_id}`)}
                                   style={{ 
                                       width: 140, 
                                       marginRight: 15,
                                       backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
                                       borderRadius: 16,
                                       padding: 10,
                                       borderWidth: 1,
                                       borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)'
                                   }}
                               >
                                   <Image 
                                       source={{ uri: item.image_url }} 
                                       style={{ width: '100%', height: 100, borderRadius: 12, marginBottom: 8 }} 
                                       resizeMode="cover"
                                   />
                                   <Text 
                                       numberOfLines={2} 
                                       style={{ 
                                           fontSize: 12, 
                                           color: COLORS.text, 
                                           fontWeight: '600' 
                                       }}
                                   >
                                       {item.title}
                                   </Text>
                               </TouchableOpacity>
                           ))}
                       </ScrollView>
                   </View>
               )}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeScreen>
  );
};

export default NewsDetails;
