import LogoRouge from "@/assets/images/logoRouge.svg";
import { getStyles } from "@/assets/styles/headerSecondaire";
import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
const HeaderSecondaire = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <>
    <View style={styles.header}>
      <LogoRouge/>
    </View>
    </>
  );
};

export default HeaderSecondaire;
