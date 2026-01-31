import { StyleSheet, Dimensions } from "react-native";
import { SHADOWS } from "../../constants/shadows";

const { width } = Dimensions.get("window");

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        paddingBottom: 40,
    },
    // Hero Section
    heroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: COLORS.card,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        ...SHADOWS.medium,
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    heroGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
    },
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.background, // or white if logo needs it
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.techGlow,
        marginBottom: 16,
    },
    logo: {
        width: 70,
        height: 70,
    },
    appName: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: 1,
        fontFamily: "Epilogue_800ExtraBold",
    },
    versionText: {
        fontSize: 14,
        color: COLORS.neon || COLORS.primary,
        marginTop: 4,
        fontWeight: "600",
        backgroundColor: COLORS.glassSurface || 'rgba(0,0,0,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
    },
    
    // Content Sections
    sectionContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 12,
        marginLeft: 4,
        fontFamily: "Epilogue_700Bold",
        flexDirection: 'row',
        alignItems: 'center',
    },
    glassCard: {
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        ...SHADOWS.small,
    },
    cardText: {
        fontSize: 15,
        color: COLORS.textLight || '#555',
        lineHeight: 24,
        fontFamily: "Epilogue_400Regular",
        marginBottom: 12,
    },
    highlight: {
        color: COLORS.neon || COLORS.primary,
        fontWeight: "700",
    },
    
    // Bullet Points
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start',
    },
    bulletIcon: {
        marginTop: 4,
        marginRight: 10,
    },
    
    // Footer / Developer
    devContainer: {
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        opacity: 0.8,
    },
    devText: {
        fontSize: 12,
        color: COLORS.textLight,
        textAlign: 'center',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop: 15,
    },
    socialButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    }
});
