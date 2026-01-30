import React, { useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import newsCategoryList from "../constants/Categories";

type Props = {
  onCategoryChanged: (category: string) => void;
};

const CategoriesComponent = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<
    Array<React.ElementRef<typeof TouchableOpacity> | null>
  >([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryPress = (index: number) => {
    setActiveCategory(index);
    // Scroll automatique vers la catégorie sélectionnée
    itemRef.current[index]?.measureLayout(
      scrollRef.current as any,
      (x, y, width, height) => {
        scrollRef.current?.scrollTo({ x: x - 10, y: 0, animated: true });
      }
    );
    onCategoryChanged(newsCategoryList[index].slug);
  };

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        {newsCategoryList.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            ref={(el) => { itemRef.current[index] = el; }}
            style={[
              styles.categoryButton,
              activeCategory === index && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryPress(index)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === index && styles.activeCategoryText,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesComponent;

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeCategoryButton: {
    backgroundColor: "#FF3B30",
  },
  categoryText: {
    fontSize: 12,
    color: "#FF3B30",
    fontFamily: "Epilogue_700Bold",
    letterSpacing: 0.5,
  },
  activeCategoryText: {
    color: "#fff",
  },
});
