import SafeScreen from "@/components/SafeScreen";
import { NewsItem } from "@/components/news";
import { ThemeContext } from "@/context/ThemeContext";
import { NewsDataType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import { getStyles } from "../assets/styles/search.Style";

export default function SearchScreen() {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const [initialNews, setInitialNews] = useState<NewsDataType[]>([]);

  useEffect(() => {
    // Auto-focus the input when entering the screen
    setTimeout(() => inputRef.current?.focus(), 100);
    getInitialNews();
  }, []);

  const getInitialNews = async () => {
    setIsLoading(true);
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&image=1&removeduplicate=1&size=10`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setInitialNews(response.data.results);
      }
    } catch (err) {
      console.error("Initial news error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&q=${text}&image=1&removeduplicate=1`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setResults(response.data.results);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: NewsDataType }) => (
    <Link href={`/news/${item.article_id}`} asChild>
      <TouchableOpacity style={{ paddingHorizontal: 20 }}>
        <NewsItem item={item} />
      </TouchableOpacity>
    </Link>
  );

  const displayData = query.length > 0 ? results : initialNews;

  return (
    <SafeScreen>
      <View style={styles.container}>
        {/* Header with Search Input */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          <View style={[
            styles.searchBar, 
            isFocused && styles.searchBarFocused
          ]}>
            <Ionicons 
                name="search-outline" 
                size={20} 
                color={isFocused ? (COLORS.neon || '#00d4ff') : COLORS.textLight} 
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Rechercher..."
              placeholderTextColor={COLORS.textLight}
              value={query}
              onChangeText={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => { setQuery(""); setResults([]); }}>
                <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results */}
        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.primary || '#00d4ff'} />
          </View>
        ) : (
          <FlatList
            data={displayData}
            keyExtractor={(item) => item.article_id}
            renderItem={renderItem}
            contentContainerStyle={styles.resultsContainer}
            ListHeaderComponent={
                query.length === 0 && initialNews.length > 0 ? (
                    <Text style={styles.sectionTitle}>ACTUALITÉS RÉCENTES</Text>
                ) : null
            }
            ListEmptyComponent={
              query.length > 2 && !isLoading ? (
                <View style={styles.center}>
                   <Ionicons name="search" size={64} color={COLORS.glassBorder || '#ddd'} />
                  <Text style={styles.emptyText}>Aucun résultat trouvé pour "{query}"</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </SafeScreen>
  );
}
