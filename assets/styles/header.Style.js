import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
    StyleSheet.create({
        header: {
            backgroundColor: 'transparent', // Let SafeScreen handle bg or transparent for gradient
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
            width: 140, // Slightly smaller for elegance
            height: 35,
            resizeMode: "contain",
        },
        notification: {
            padding: 8,
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
            backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
            borderRadius: 14,
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
            // Shadow for depth
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
        },
        inputResearch: {
            flex: 1,
            fontSize: 16,
            color: COLORS.text,
        },
        reseachIcon:{
            color: COLORS.neon || '#00d4ff',            
        },
        profile: {
            padding: 10,
            borderRadius: 12,
            backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        reseachText:{
            color: COLORS.textLight || "#A5ABB9",
            fontSize: 14,
            fontFamily: "Epilogue_400Regular",
        },

    });
