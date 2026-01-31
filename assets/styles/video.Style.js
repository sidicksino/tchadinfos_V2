import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Consistent background
    },
    headerContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    
    categoriesList: {
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingBottom: 10,
        height: 50, // Ensure height for horizontal scroll
    },
    categoryPill: {
        justifyContent: 'center', // Center text vertical
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: COLORS.card || '#fff', // Solid fallback for visibility check
        borderWidth: 1,
        borderColor: COLORS.border || '#eee',
        marginRight: 10,
        height: 36, // Fixed height
    },
    categoryPillActive: {
        backgroundColor: COLORS.neon ? `${COLORS.neon}20` : '#E3F2FD',
        borderColor: COLORS.neon || '#00d4ff',
    },
    categoryText: {
        color: COLORS.text || '#000', // Stronger contrast
        fontSize: 13,
        fontWeight: "600",
    },
    categoryTextActive: {
        color: COLORS.neon || '#00d4ff',
    },

    // Video Feed
    feedContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    
    // Video Card
    cardContainer: {
        marginBottom: 24,
        borderRadius: 16,
        backgroundColor: COLORS.card,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    thumbnailContainer: {
        width: '100%',
        height: 200, // 16:9 approx relative to width, fixed height for consistency
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    playOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)', // Glassy play button
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(10px)', // Web only, but good to have logic-wise
    },
    durationBadge: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    durationText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: "700",
    },
    
    // Card Info
    infoContainer: {
        padding: 16,
    },
    categoryLabel: {
        color: COLORS.neon || '#00d4ff',
        fontSize: 12,
        fontWeight: "700",
        textTransform: 'uppercase',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    videoTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        color: COLORS.textLight,
        fontSize: 12,
    },
});