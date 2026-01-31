import { StyleSheet } from "react-native";
import { SHADOWS } from "@/constants/shadows";

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    // Custom Segmented Control
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 4,
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        height: 50,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    tabActive: {
        backgroundColor: COLORS.card,
        ...SHADOWS.small,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textLight,
        fontFamily: "Epilogue_600SemiBold",
    },
    tabTextActive: {
        color: COLORS.neon || '#00d4ff',
    },
    
    // Content Area
    content: {
        flex: 1,
        paddingHorizontal: 0, // List items usually have their own padding
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: COLORS.textLight,
        marginTop: 10,
        fontSize: 14,
        fontFamily: "Epilogue_400Regular",
    }
});