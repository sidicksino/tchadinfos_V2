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
      width: width * 0.9,
      height: 220,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
    },
    backround: {
      position: "absolute",
      left: (width - (width * 0.9)) / 2, // Centered relative to screen
      right: (width - (width * 0.9)) / 2,
      top: 0,
      width: width * 0.9,
      height: 220,
      borderRadius: 24,
      padding: 20,
      justifyContent: 'flex-end', // Align text to bottom
    },
    sourceInfos: {
      marginBottom: 8,
      backgroundColor: COLORS.neon ? COLORS.neon + '4D' : 'rgba(0, 212, 255, 0.3)', // 30% opacity
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.neon ? COLORS.neon + '80' : 'rgba(0, 212, 255, 0.5)', // 50% opacity
    },
    sourceName: {
      color: '#fff',
      fontSize: 10,
      fontWeight: "700",
      textTransform: "uppercase",
      fontFamily: "Epilogue_700Bold",
    },
    title: {
      color: '#fff',
      fontSize: 18,
      fontFamily: "Epilogue_700Bold", // Changed to Bold for impact
      fontWeight: "bold",
      lineHeight: 24,
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
  });
  