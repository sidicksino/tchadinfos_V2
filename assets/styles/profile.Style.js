import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        // flex: 1, // Removed to allow scrolling
        backgroundColor: COLORS.background,
        paddingTop: 0,
        paddingBottom: 40, // Ensure bottom content is accessible
    },
    headerSpace: {
        height: 10,
    },
    profileHeader: {
        alignItems: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    // Glassmorphic User Card
    userCard: {
        width: '100%',
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.neon || '#00d4ff',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.background,
    },
    userName: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 16,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.neon ? `${COLORS.neon}20` : 'rgba(0, 212, 255, 0.15)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.neon || '#00d4ff',
    },
    premiumText: {
        color: COLORS.neon || '#00d4ff',
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },
    
    // Stats Section (Optional)
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 4,
    },

    // Settings Menu
    settingsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textLight,
        marginTop: 24,
        marginBottom: 12,
        marginLeft: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.card, // Or glassSurface
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        // Shadow for depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.background, // Contrast
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
    },
    logoutText: {
        color: '#ff4757',
        fontWeight: "600",
    },
});
