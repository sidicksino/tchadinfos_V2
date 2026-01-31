import React, { useRef, useState, useContext } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import newsCategoryList from "../constants/Categories";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  onCategoryChanged: (category: string) => void;
};

const CategoriesComponent = ({ onCategoryChanged }: Props) => {
  const { isDarkMode, COLORS } = useContext(ThemeContext);
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<Array<React.ElementRef<typeof TouchableOpacity> | null>>([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryPress = (index: number) => {
    setActiveCategory(index);
    // Auto Scroll logic
    itemRef.current[index]?.measureLayout(
      scrollRef.current as any,
      (x, y, width, height) => {
        scrollRef.current?.scrollTo({ x: x - width / 2, y: 0, animated: true });
      },
      () => {} // onError
    );
    onCategoryChanged(newsCategoryList[index].slug);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
      >
        {newsCategoryList.map((category, index) => {
            const isActive = activeCategory === index;
            // Neon Tech Colors
            const activeColor = COLORS.neon || '#00d4ff'; 
            const inactiveColor = isDarkMode ? '#888' : '#555';
            
            return (
              <TouchableOpacity
                key={category.id}
                ref={(el) => { itemRef.current[index] = el; }}
                style={[
                  styles.categoryButton,
                  {
                      borderColor: isActive ? activeColor : (isDarkMode ? '#333' : '#e0e0e0'),
                      backgroundColor: isActive ? (COLORS.neon ? COLORS.neon + '26' : 'rgba(0, 212, 255, 0.15)') : 'transparent',
                  }
                ]}
                onPress={() => handleCategoryPress(index)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                        color: isActive ? activeColor : inactiveColor,
                        fontWeight: isActive ? '700' : '500',
                    }
                  ]}
                >
                  {category.title}
                </Text>
              </TouchableOpacity>
            )
        })}
      </ScrollView>
    </View>
  );
};

export default CategoriesComponent;

const styles = StyleSheet.create({
  container: {
      paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
});
