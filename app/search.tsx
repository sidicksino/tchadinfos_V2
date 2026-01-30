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
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SearchScreen() {
  const { COLORS } = useContext(ThemeContext);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
      // Using generic search endpoint - adjusting query param as needed for newsdata.io
      // Note: newsdata.io free tier has limited search ('q' parameter).
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
      <View style={[styles.container, { backgroundColor: COLORS.background }]}>
        {/* Header with Search Input */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          <View style={[styles.searchBar, { backgroundColor: COLORS.card, borderColor: COLORS.border }]}>
            <Ionicons name="search-outline" size={20} color={COLORS.textLight} />
            <TextInput
              ref={inputRef}
              style={[styles.input, { color: COLORS.text }]}
              placeholder="Rechercher..."
              placeholderTextColor={COLORS.textLight}
              value={query}
              onChangeText={handleSearch}
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
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={displayData}
            keyExtractor={(item) => item.article_id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
            ListHeaderComponent={
                query.length === 0 && initialNews.length > 0 ? (
                    <Text style={{ marginLeft: 20, marginBottom: 10, fontSize: 16, fontFamily: 'Epilogue_700Bold', color: COLORS.text }}>Actualités récentes</Text>
                ) : null
            }
            ListEmptyComponent={
              query.length > 2 && !isLoading ? (
                <View style={styles.center}>
                  <Text style={{ color: COLORS.textLight, fontFamily: 'Epilogue_400Regular' }}>Aucun résultat trouvé</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  backButton: {
    padding: 5,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Epilogue_400Regular",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
