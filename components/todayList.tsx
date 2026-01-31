import { useRouter } from "expo-router";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  useAnimatedRef,
  useSharedValue
} from "react-native-reanimated";
import { NewsDataType } from "../types";
import TodayItem from "./todayItem";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  newsList: Array<NewsDataType>;
};

const TodayList = ({ newsList }: Props) => {
  const router = useRouter(); 
  const { COLORS } = useContext(ThemeContext);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  // Dynamic Styles
  const dynamicStyles = StyleSheet.create({
      title: {
          color: COLORS.text,
      },
      button: {
          borderColor: COLORS.neon || '#00d4ff',
      },
      buttonText: {
          color: COLORS.neon || '#00d4ff',
      }
  });

  return (
    <View style={styles.container}>
      <View style={styles.todayTextContent}>
        <Text style={[styles.todayText, dynamicStyles.title]}>Aujourd’hui</Text>
        <TouchableOpacity 
          style={[styles.todayButton, dynamicStyles.button]}
          onPress={() => router.push("/search")} 
        >
          <Text style={[styles.todayButtonText, dynamicStyles.buttonText]}>Plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={newsList} 
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <TodayItem slideItem={item} index={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 15 }} 
        />
      </View>
    </View>
  );
};

export default TodayList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  todayTextContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  todayText: {
    fontSize: 18,
    fontFamily: "Epilogue_500Medium",
    fontWeight: "600",
  },
  todayButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  todayButtonText: {
    fontSize: 11,
    fontFamily: "Epilogue_500Medium",
    fontWeight: "600",
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
