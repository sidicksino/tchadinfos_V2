import { Link } from "expo-router";
import Moment from "moment";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NewsDataType } from "../types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  newsList: Array<NewsDataType>;
};

const News = ({ newsList }: Props) => {
  return (
    <View style={styles.container}>
      {newsList.map((item, index) => (
        <NewsItem item={item} key={index} />
      ))}
    </View>
  );
};

export const NewsItem = ({ item }: { item: NewsDataType }) => {
  const { isDarkMode, COLORS } = useContext(ThemeContext);
  
  // Tech/Clean Palette
  const cardBg = isDarkMode ? (COLORS.glassSurface || 'rgba(255,255,255,0.05)') : '#fff';
  const textColor = isDarkMode ? '#e0e0e0' : '#1A1A1A';
  const dateColor = isDarkMode ? '#aaa' : '#888';
  const borderColor = isDarkMode ? (COLORS.glassBorder || 'rgba(255,255,255,0.1)') : 'rgba(0,0,0,0.05)';
  const neonColor = COLORS.neon || '#00d4ff';

  return (
    <Link href={`/news/${item.article_id}`} asChild>
      <TouchableOpacity activeOpacity={0.7} style={{ marginBottom: 16 }}>
        <View style={[styles.itemContainer, { backgroundColor: cardBg, borderColor }]}>
          <Image source={{ uri: item.image_url }} style={styles.itemImage} resizeMode="cover" />
          <View style={styles.itemInfo}>
            <View style={styles.headerRow}>
                <Text style={[styles.itemCategory, { color: neonColor }]}>
                    {item.category || 'Actualité'}
                </Text>
            </View>
            
            <Text style={[styles.itemTitle, { color: textColor }]} numberOfLines={3}>
              {item.title}
            </Text>
            
            <View style={styles.itemFooter}>
              <View style={styles.timeContainer}>
                 <Ionicons name="time-outline" size={14} color={dateColor} style={{ marginRight: 4 }} />
                 <Text style={[styles.itemDateText, { color: dateColor }]}>
                    {Moment(item.pubDate).startOf("day").fromNow()}
                 </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    // Soft shadow for depth, less aggressive
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12, 
    marginRight: 14,
    backgroundColor: '#333', // Placeholder bg
  },
  itemInfo: {
    flex: 1,
    height: 100,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  itemCategory: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: 'System', 
    flex: 1, 
    // marginTop: 2,
  },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  timeContainer: {
      flexDirection: 'row', 
      alignItems: 'center',
  },
  itemDateText: {
    fontSize: 12,
    fontFamily: "Epilogue_400Regular",
  },
});
