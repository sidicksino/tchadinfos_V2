import { StyleSheet, Dimensions } from "react-native";
import { SHADOWS } from "../../constants/shadows";

const { width, height } = Dimensions.get("window");

export const getStyles = (COLORS) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    headerContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    logoContainer: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        marginBottom: 20,
        ...SHADOWS.techGlow,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.text,
        fontFamily: "Epilogue_800ExtraBold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textLight,
        fontFamily: "Epilogue_400Regular",
        textAlign: 'center',
    },
    
    // Form
    formContainer: {
        gap: 16,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        color: COLORS.textLight,
        fontWeight: "600",
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Epilogue_400Regular",
        marginLeft: 12,
    },
    
    // Buttons
    button: {
        backgroundColor: COLORS.neon || '#00d4ff',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        ...SHADOWS.techGlow,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "Epilogue_700Bold",
    },
    outlineButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.2)',
        backgroundColor: 'transparent',
    },
    outlineFaint: {
        borderWidth: 0,
    },
    outlineButtonText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
    },
    
    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        gap: 5,
    },
    footerText: {
        color: COLORS.textLight,
        fontSize: 14,
    },
    linkText: {
        color: COLORS.neon || '#00d4ff',
        fontWeight: "700",
        fontSize: 14,
    },
    
    // Validation
    errorText: {
        color: '#ff4d4f',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});
