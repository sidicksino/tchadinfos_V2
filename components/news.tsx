import { Link } from "expo-router";
import Moment from "moment";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Time from "../assets/images/time.svg";
import { NewsDataType } from "../types";
import Loading from "./loading";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  newsList: Array<NewsDataType>;
};

const News = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.length == 0 ? (
        <Loading size={"large"} />
      ) : (
        newsList.map((item, index) => (
          <Link href={`/news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
              <NewsItem  item={item}/>
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
};

export const NewsItem = ({ item }: { item: NewsDataType }) => {
  const { isDarkMode, COLORS } = useContext(ThemeContext);
  
  const cardBg = isDarkMode ? (COLORS.glassSurface || 'rgba(255,255,255,0.05)') : '#fff';
  const textColor = isDarkMode ? '#e0e0e0' : '#1A1A1A';
  const dateColor = isDarkMode ? '#aaa' : '#666';
  const borderColor = isDarkMode ? (COLORS.glassBorder || 'rgba(255,255,255,0.1)') : 'rgba(0,0,0,0.05)';

  return (
    <View style={[styles.itemContainer, { backgroundColor: cardBg, borderColor }]}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemInfo}>
        <Text style={[styles.itemCategory, { color: COLORS.neon || '#00d4ff' }]}>{item.category || 'Actualité'}</Text>
        <Text style={[styles.itemTitle, { color: textColor }]} numberOfLines={3}>
          {item.title}
        </Text>
        <View style={styles.itemDate}>
          <View style={styles.logo}>
            <Time />
          </View>
          <Text style={[styles.itemDateText, { color: dateColor }]}>
            {Moment(item.pubDate).startOf("day").fromNow()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 15,
    marginBottom: 70,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    // Minimal shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15, // Spacing between items
    paddingRight: 10,
  },
  itemImage: {
    width: 110,
    height: 110,
    borderRadius: 16, // Matching left border
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00d4ff", // We will style this dynamic in the component
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginVertical: 4,
    fontFamily: 'System', 
  },
  itemDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logo: {
    justifyContent: "center",
    padding: 0,
    width: 12,
    height: 12,
  },
  itemDateText: {
    fontSize: 11,
    fontFamily: "Epilogue_400Regular",
  },
});
