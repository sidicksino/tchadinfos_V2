import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { getStyles } from "../assets/styles/todayItem.Style";
import { ThemeContext } from "../context/ThemeContext";
import { NewsDataType } from "../types";

type Props = {
  slideItem: NewsDataType;
  index: number;
  
};

const { width } = Dimensions.get("screen");

const TodayItem = ({ slideItem, index}: Props) => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <Link href={`/news/${slideItem.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper]}>
          <Image source={{ uri: slideItem.image_url }} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgb(0,51,160)"]}
            style={styles.backround}
          >
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default TodayItem;