import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
  StyleSheet.create({
    contenair: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      backgroundColor: COLORS.text,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 50,
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
    },
    header1: {
      backgroundColor: COLORS.text,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 50,
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
    },
    textLive: {
      fontFamily: "times new roman",
      fontSize: 18,
      letterSpacing: 0.6,
      lineHeight: 25,
      padding: 25,
      top: 40,
    },
    content: {
      top: 80,
      flex: 1,
      flexDirection: "row",
      gap: 20,
      justifyContent: "space-between",
      alignContent: "center",
      paddingHorizontal: "15%",
    },
    button: {
      backgroundColor: COLORS.primary,
      padding: 20,
      borderRadius: 20,
      alignContent: "center",
      alignItems: "center",
    },
    buttonLive: {
      gap: 25,
    },
    buttonTextLive: {
      fontFamily: "times new roman",
      fontSize: 20,
    },
    backButton: {
      marginLeft: "-80%",
      width: 45,
      height: 45,
      backgroundColor: "#00000050",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    backIcons: {
      color: "#fff",
    },
    Top:{
        marginTop: "5%"
    }
  });
