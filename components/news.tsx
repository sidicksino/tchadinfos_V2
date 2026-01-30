import { Link } from "expo-router";
import Moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Time from "../assets/images/time.svg";
import { NewsDataType } from "../types";
import Loading from "./loading";

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
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <View style={styles.itemDate}>
          <View style={styles.logo}>
            <Time />
          </View>
          <Text style={styles.itemDateText}>
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
    marginHorizontal: 20,
    marginBottom: 70,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImage: {
    width: 133,
    height: 115,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  itemCategory: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0033A0",
    textTransform: "capitalize",
    fontFamily: "Epilogue_400Regular",
  },
  itemTitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#141E28",
    lineHeight: 20,
    letterSpacing: 0.5,
    fontFamily: "Epilogue_500Medium",
  },
  itemDate: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  logo: {
    justifyContent: "center",
    padding: 3,
    width: 15,
    height: 15,
    backgroundColor: "#A5ABB9" + "50",
    borderRadius: 20,
  },
  itemDateText: {
    fontSize: 10,
    fontFamily: "Epilogue_400Regular",
  },
});
