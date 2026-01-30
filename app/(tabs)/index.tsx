import SafeScreen from "@/components/SafeScreen";
import axios from "axios";
import { Link } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getStyles } from "../../assets/styles/home.Style";
import BreakingNews from "../../components/breakingNwes";
import Categories from "../../components/categories";
import Header from "../../components/header";
import Loading from "../../components/loading";
import { NewsItem } from "../../components/news";
import TodayList from "../../components/todayList";
import { ThemeContext } from "../../context/ThemeContext";
import { NewsDataType } from "../../types/index";

const index = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&country=td&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching breaking news:", err.message);
    }
  };

  const getNews = async (category: string = "") => {
    let categoryString = "";
    if (category.length !== 0) {
      categoryString = `&category=${category}`;
    }
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=fr&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Error fetching breaking news:", err.message);
    }
  };

  const onCatChanged = (category: string) => {
    console.log("Categories", category);
    setNews([]);
    getNews(category);
  };

  const renderNewsItem = ({ item }: { item: NewsDataType }) => (
    <Link href={`/news/${item.article_id}`} asChild>
      <TouchableOpacity style={{ paddingHorizontal: 20 }}>
        <NewsItem item={item} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Header />
        <FlatList
          data={news}
          keyExtractor={(item) => item.article_id}
          showsVerticalScrollIndicator={false}
          renderItem={renderNewsItem}
          ListHeaderComponent={
            <>
              {isLoading ? (
                <Loading size={"large"} />
              ) : (
                <>
                  <BreakingNews newsList={breakingNews} />
                  <TodayList newsList={breakingNews} />
                </>
              )}
              <View style={{ marginBottom: 20 }}>
                <Categories onCategoryChanged={onCatChanged} />
              </View>
            </>
          }
          ListEmptyComponent={!isLoading ? <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucune actualité trouvée</Text> : null}
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      </View>
    </SafeScreen>
  );
};

export default index;
