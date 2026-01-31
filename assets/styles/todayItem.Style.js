import { StyleSheet } from "react-native";

export const getStyles = (COLORS) => StyleSheet.create({
    itemWrapper: {
        width: 160,
        height: 220,
        marginRight: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    backround: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 12,
    },
    sourceInfos: {
        marginBottom: 6,
        backgroundColor: 'rgba(0, 212, 255, 0.3)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 212, 255, 0.5)',
    },
    sourceName: {
        color: '#fff',
        fontSize: 10,
        fontWeight: "700",
        fontFamily: "Epilogue_700Bold",
        textTransform: "uppercase",
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontFamily: "Epilogue_700Bold",
        fontWeight: "600",
        lineHeight: 18,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
        marginBottom: 4,
    },
});
