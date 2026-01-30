import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export const  getStyles = (COLORS) => StyleSheet.create({
    itemWrapper: {
      position: "relative",
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: width - 60,
      height: 200,
      borderRadius: 20,
    },
    backround: {
      position: "absolute",
      left: 30,
      right: 0,
      top: 0,
      width: width - 60,
      height: 200,
      borderRadius: 20,
      padding: 10,
    },
    sourceInfos: {
      position: "absolute",
      top: 105,
      paddingHorizontal: 20,
    },
    sourceName: {
      color: COLORS.background,
      fontSize: 16,
      fontWeight: "700",
      fontFamily: "Epilogue_700Bold",
    },
    title: {
      color: COLORS.background,
      fontSize: 16,
      position: "absolute",
      fontFamily: "Epilogue_400Regular",
      top: 130,
      fontWeight: "200",
      paddingHorizontal: 20,
      lineHeight: 20,
      letterSpacing: 0.5
    },
  });
  