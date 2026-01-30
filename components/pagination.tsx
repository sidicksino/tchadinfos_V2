import React, { useContext } from "react";
import { View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { getStyles } from "../assets/styles/pagination.Style";
import { ThemeContext } from "../context/ThemeContext";
import { NewsDataType } from "../types";

type Props = {
  items: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <View style={styles.container}>
      {items.map((_, index) => (
        <Animated.View
          style={[
            styles.dot,
            { backgroundColor: paginationIndex === index ? "red" : "#595959" },
          ]}
          key={index}
        />
      ))}
    </View>
  );
};

export default Pagination;