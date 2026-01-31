import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
    StyleSheet.create({
        header: {
            backgroundColor: 'transparent',
            paddingHorizontal: 15,
            marginBottom: 20,
            paddingTop: 10,
        },
        headerTop: {
            marginBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerBottom: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 0,
            gap: 12,
        },
        logo: {
            width: 140,
            height: 35,
            resizeMode: "contain",
        },
        notification: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        searchBox: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
            height: 50, // Fixed height for alignment
            backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
            borderRadius: 14,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        inputResearch: {
            flex: 1,
            fontSize: 14,
            color: COLORS.text,
        },
        reseachIcon:{
            color: COLORS.neon || '#00d4ff',            
        },
        profile: {
            width: 50, // Fixed width matching height
            height: 50, // Fixed height matching SearchBox
            borderRadius: 14, // Consistent radius
            backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        reseachText:{
            color: COLORS.text, // Match theme text
            opacity: 0.6, // Placeholder effect
            fontSize: 14,
            fontFamily: "Epilogue_400Regular",
        },

    });
