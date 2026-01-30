import { useRouter } from "expo-router";
import React, { useState } from "react";
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

type Props = {
  newsList: Array<NewsDataType>;
};

const TodayList = ({ newsList }: Props) => {
  const router = useRouter(); // <--- Add Hook
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();


  return (
    <View style={styles.container}>
      <View style={styles.todayTextContent}>
        <Text style={styles.todayText}>Aujourd’hui</Text>
        <TouchableOpacity 
          style={styles.todayButton}
          onPress={() => router.push("/search")} // <--- Navigate to Search
        >
          <Text style={styles.todayButtonText}>Plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={newsList} // <--- Use prop directly
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <TodayItem slideItem={item} index={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
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
    marginHorizontal: 10,
    marginBottom: 10,
    alignContent: "center",
  },
  todayText: {
    fontSize: 18,
    fontFamily: "Epilogue_500Medium",
  },
  todayButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  todayButtonText: {
    color: "#FF3B30",
    fontSize: 11,
    fontFamily: "Epilogue_500Medium",
  },
  slideWrapper: {
    // width: "100%",
    justifyContent: "center",
    // flex: 1,
  },
});
