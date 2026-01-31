import { StyleSheet } from "react-native";

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 15,
        backgroundColor: COLORS.background, 
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderRadius: 16,
        paddingHorizontal: 15,
        borderWidth: 1,
        gap: 10,
        backgroundColor: COLORS.card, // Solid color avoids shadow artifacts
        borderColor: COLORS.border,
        elevation: 0, // CRITICAL FIX: Removes Android default shadow
    },
    searchBarFocused: {
        borderColor: COLORS.neon || '#00d4ff', // Highlight border only
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Epilogue_400Regular",
        color: COLORS.text,
        height: '100%',
    },
    resultsContainer: {
        paddingBottom: 50,
        paddingTop: 10,
    },
    sectionTitle: {
        marginLeft: 20,
        marginBottom: 15,
        fontSize: 14,
        fontFamily: 'Epilogue_700Bold',
        color: COLORS.neon || COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    
    // States
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        color: COLORS.textLight,
        fontSize: 16,
        fontFamily: 'Epilogue_500Medium',
    },
});
