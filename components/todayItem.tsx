import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { getStyles } from "../assets/styles/todayItem.Style";
import { ThemeContext } from "../context/ThemeContext";
import { NewsDataType } from "../types";

type Props = {
  slideItem: NewsDataType;
  index: number;
};

const TodayItem = ({ slideItem, index}: Props) => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <Link href={`/news/${slideItem.article_id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <Animated.View style={[styles.itemWrapper]}>
          <Image source={{ uri: slideItem.image_url }} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", COLORS.cardGradient || "rgb(0,51,160)"]}
            style={styles.backround}
          >
             <View style={styles.sourceInfos}>
                <Text style={styles.sourceName}>{slideItem.source_name || 'UNE'}</Text>
             </View>
             <Text style={styles.title} numberOfLines={3}>
                {slideItem.title}
             </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default TodayItem;