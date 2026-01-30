import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
    StyleSheet.create({
        header: {
            backgroundColor: COLORS.background,
            paddingHorizontal: 10,
            marginBottom: 20,
        },
        headerTop: {
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerBottom: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            gap: 10,
        },
        logo: {
            width: 200,
            height: 35,
            resizeMode: "contain",
        },
        notification: {
            backgroundColor: COLORS.text,
            padding: 5,
            borderRadius: 30,
        },
        searchBox: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            backgroundColor: COLORS.text + "10",
            borderRadius: 12,
            paddingHorizontal: 13,
            paddingVertical: 10,
            marginRight: 0,
            borderWidth: 1,
            borderColor: COLORS.text + "20",
        },
        inputResearch: {
            flex: 1,
            fontSize: 16,
        },
        reseachIcon:{
            color: COLORS.text + "90",            
        },
        profile: {
            marginLeft: 8,
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 8,
            resizeMode: "cover",
            backgroundColor: COLORS.text + "10",
            borderWidth: 1,
            borderColor: COLORS.text + "20",
            color: COLORS.text + "90",
        },
        reseachText:{
            color: "#A5ABB9",
            fontSize: 16,
            fontFamily: "Epilogue_400Regular",
        },

    });
