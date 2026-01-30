import { Dimensions, PixelRatio, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const responsiveFontSize = (size) => {
  const scale = width / 375; // 375 = largeur iPhone X (base)
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const getStyles = (COLORS) =>
  StyleSheet.create({
    page: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: COLORS.card,
    },
    welcomeImage: {
      top: -60,
      left: 65,
      width: width * 0.8,
      height: height * 0.37,
      resizeMode: "contain",
      marginTop: height * 0.05,
      transform: [{ rotate: '0deg' }],
    },

    ti_logo: {
      width: width * 0.5,
      height: width * 0.5,
      resizeMode: "contain",
      top: -50,
    },

    title: {
      fontSize: responsiveFontSize(35),
      textAlign: "center",
      color: COLORS.text,
      width: width * 0.9,
      fontFamily: "EagleLake_400Regular",
      marginTop: -height * 0.05,
      shadowColor: COLORS.primary,
      shadowOffset: { width: 3, height: 2 },
      shadowOpacity: 0.95,
      shadowRadius: 0.84,
      elevation: 3,
    },
    title1: {
      fontSize: responsiveFontSize(20),
      textAlign: "center",
      color: COLORS.card,
      paddingHorizontal: 20,
      fontFamily: "EagleLake_400Regular",
      shadowColor: COLORS.primary,
      shadowOffset: { width: 3, height: 2 },
      shadowOpacity: 0.95,
      shadowRadius: 0.84,
      elevation: 3,
    },    
    button: {
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 40,
      alignItems: "center",
      marginTop: 10,
      width: "80%",
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "600",
    },
    buttonPasser: {
      position: "absolute",
      top: height * 0.06, 
      right: width * 0.05, 
      paddingVertical: height * 0.007,
      paddingHorizontal: width * 0.03,
      backgroundColor: "transparent",
      borderRadius: 8,
      zIndex: 10,
    },
    textPasser: {
      fontSize: 18,
      color: COLORS.text,
      fontFamily: "Epilogue_400Regular",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    contentText: {
      fontSize: 16,
      color: COLORS.text,
      textAlign: "center",
      marginHorizontal: 20,
      marginTop: 10,
      fontFamily: "Epilogue_400Regular",
      color: "#fff",
    },
    textContainer1: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingHorizontal: 0,
      bottom: 190
    },
    contentText1: {
      fontSize: responsiveFontSize(16),
      marginTop: 10,
      lineHeight: responsiveFontSize(22),
      paddingHorizontal: 25,
      letterSpacing: 0,
      fontFamily: "Epilogue_400Medium",
      color: COLORS.card,
      textAlign: "justify",
      opacity: 0.75
    },    
    textContainer: {
      flex: 1,
      zIndex: 2,
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    },    
  });
