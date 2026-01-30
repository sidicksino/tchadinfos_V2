import { StyleSheet } from "react-native";

export const getStyles = (COLORS) =>
    StyleSheet.create({
        contenair: {
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 20,
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
        },
        registerButton: {
            backgroundColor: COLORS.primary,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 40,
            alignItems: "center",
            marginTop: 10,
            width: "80%",
        },
        buttonTextLive: {
            color: COLORS.white,
            fontSize: 18,
            fontWeight: "600",
          },
          headerLoged: {
            backgroundColor: COLORS.text,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
          },
          avatar: {
            marginTop: 30,
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: COLORS.primary,
          },
          editIcon: {
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: 5,
            color: COLORS.primary,
            borderColor: COLORS.primary,
            borderWidth: 3
          },
          userName:{
            marginTop: 20,
            marginBottom: 10,
            fontFamily: "Epilogue_500Medium",
            fontSize: 20,
            color: COLORS.background,
          },
          userEmail:{
            fontFamily: 'Epilogue_400Regular',
            fontSize: 14,
            color: COLORS.background,
          },
          content:{
            backgroundColor: COLORS.background,
            padding: 5,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.text
          },
          profileSetting:{
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          text:{
            marginTop: 20,
            marginBottom: 10,
            fontFamily: "Epilogue_500Medium",
            fontSize: 20,
            color: COLORS.text,
            
          },
          setting:{
            top: 20,
            backgroundColor: COLORS.background,
            paddingHorizontal: 30,
            borderRadius: 30,
            gap: 20,
            paddingBottom: 90
          },
          flex:{
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: 20
          }
    });
