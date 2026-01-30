import LogoRouge from "@/assets/images/logoRouge.svg";
import { getStyles } from "@/assets/styles/headerSecondaire";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
const HeaderSecondaire = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <>
      <View style={styles.header1}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} style={styles.backIcons} />
        </TouchableOpacity>
        <LogoRouge style={styles.Top}/>
      </View>
    </>
  );
};

export default HeaderSecondaire;
