import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const getStyles = (COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    imageContainer: {
        width: width,
        height: 400,
        position: 'relative',
    },
    image: {
      width: width,
      height: "100%",
      resizeMode: "cover",
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200, // Gradient height
    },
    headerSearche: {
      position: "absolute",
      top: 10, // Safe Area will handle spacing usually, but lets add some
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      zIndex: 10,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      // Glass effect
      backgroundColor: COLORS.glassSurface || 'rgba(0,0,0,0.3)', 
      borderWidth: 1,
      borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
    },
    contentContainer: {
        flex: 1,
        marginTop: -40, // Overlap the image slightly
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 40,
    },
    datailsDate: {
      fontSize: 12,
      fontFamily: "Epilogue_400Regular",
      color: COLORS.neon || '#00d4ff',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "800",
      color: COLORS.text,
      marginBottom: 15,
      lineHeight: 32,
      fontFamily: "System", // Clean Sans-Serif
    },
    description: {
      fontSize: 16,
      color: COLORS.text,
      opacity: 0.8,
      marginBottom: 20,
      fontStyle: 'italic',
      lineHeight: 24,
      borderLeftWidth: 3,
      borderLeftColor: COLORS.neon || '#00d4ff',
      paddingLeft: 10,
    },
    contentText: {
      fontSize: 16,
      lineHeight: 28,
      color: COLORS.text,
      fontFamily: "System",
      opacity: 0.9,
    },
  });
