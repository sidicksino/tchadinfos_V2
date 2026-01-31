import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getStyles = (COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: COLORS.text,
      fontFamily: 'System',
    },
    liveBadge: {
      backgroundColor: '#FF0044', // Red for Live
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      shadowColor: '#FF0044',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 5,
    },
    liveText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    liveDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FFF',
    },
    toggleContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.glassSurface || 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        padding: 4,
    },
    toggleButton: {
        flex: 1,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    toggleActive: {
        backgroundColor: COLORS.neon || '#00d4ff',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },
    toggleTextActive: {
        color: '#000', // Text on Neon is usually black for contrast
    },
    playerContainer: {
        width: width - 40,
        height: (width - 40) * 0.5625, // 16:9 Aspect Ratio
        backgroundColor: '#000',
        borderRadius: 20,
        marginHorizontal: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.glassBorder || 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    playerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        backdropFilter: 'blur(10px)', // Web only, but good to have conceptual
    },
    infoSection: {
        padding: 20,
    },
    programTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
    },
    programTime: {
        fontSize: 14,
        color: COLORS.gray || '#888',
        marginBottom: 20,
    },
    upcomingContainer: {
        marginTop: 10,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 15,
        textTransform: 'uppercase',
        opacity: 0.8,
    },
    upcomingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 12,
        backgroundColor: COLORS.card || 'rgba(255,255,255,0.03)',
        borderRadius: 16,
    },
    timeBox: {
        padding: 10,
        backgroundColor: COLORS.glassSurface,
        borderRadius: 10,
        marginRight: 15,
        alignItems: 'center',
        minWidth: 60,
    },
    timeText: {
        color: COLORS.neon || '#00d4ff',
        fontWeight: '700',
        fontSize: 12,
    },
    programInfo: {
        flex: 1,
    },
    programName: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    programHost: {
        fontSize: 13,
        color: '#888',
    },
  });
