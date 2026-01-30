import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import HeaderTertiaire from "@/components/headerTertiaire";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const About = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = style(COLORS);

  return (
    <SafeScreenScondaire>
      <View style={styles.container}>
        <HeaderTertiaire />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>À propos de Tchadinfos</Text>

          <Text style={styles.title}>Qui sommes-nous ?</Text>
          <Text style={styles.description}>
            Né le 1er juin 2012, <Text style={styles.span}>Tchadinfos</Text> est
            le premier média privé d’information continue au Tchad.{"\n\n"}
            Notre mission : offrir une information fiable, indépendante et
            accessible à tous, au service des citoyens, au Tchad et dans la
            diaspora.
          </Text>

          <Text style={styles.title}>Notre évolution</Text>
          <Text style={styles.description}>
            De simple site web, nous sommes devenus en 2023 un média global avec{" "}
            <Text style={styles.span}>Tchadinfos</Text> TV et{" "}
            <Text style={styles.span}>Tchadinfos</Text> FM, présents sur le Web,
            la TV, la Radio et les réseaux sociaux.
          </Text>

          <Text style={styles.title}>Nos valeurs</Text>
          <View style={styles.list}>
            <Text style={styles.bullet}>
              • <Text>Professionnalisme :</Text> publier vite mais surtout
              juste.
            </Text>
            <Text style={styles.bullet}>
              • <Text>Intégrité :</Text> indépendance éditoriale totale.
            </Text>
            <Text style={styles.bullet}>
              • <Text>Innovation :</Text> explorer de nouvelles façons de
              raconter l’actualité.
            </Text>
            <Text style={styles.bullet}>
              • <Text>Responsabilité :</Text> informer dans le respect de la
              dignité et de la diversité.
            </Text>
          </View>

          <Text style={styles.title}>Notre mission</Text>
          <View style={styles.list}>
            <Text style={styles.bullet}>
              • Informer clairement et en continu.
            </Text>
            <Text style={styles.bullet}>
              • Éduquer aux enjeux du Tchad, de l’Afrique et du monde.
            </Text>
            <Text style={styles.bullet}>
              • Progresser ensemble pour la démocratie et le développement.
            </Text>
          </View>
          <Text style={styles.title}>Notre vision</Text>
          <Text style={styles.description}>
            Être un média de référence en Afrique et au-delà, le miroir de la
            société tchadienne et la voix de ses citoyens sur la scène
            internationale.
          </Text>
          <Text style={styles.title}>Aujourd’hui et demain</Text>
          <Text style={styles.description}>
            <Text style={styles.span}>Tchadinfos TV</Text>, c’est plus qu’un média : une communauté de journalistes
            et créateurs qui défendent la liberté de la presse et croient que
            l’information de qualité est un levier de progrès pour le Tchad et
            pour l’Afrique.{" "}
          </Text>

          <Text style={styles.slogan}>
            Slogan : Informer – Éduquer – Progresser
          </Text>
        </ScrollView>
      </View>
    </SafeScreenScondaire>
  );
};

export default About;

const style = (COLORS) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    content: {
      paddingHorizontal: 18,
      paddingBottom: 40,
    },
    header: {
      fontSize: 24,
      fontWeight: "700",
      color: COLORS.primary,
      textAlign: "center",
      marginVertical: 16,
      fontFamily: "Epilogue_700Bold",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.shadow,
      marginTop: 20,
      marginBottom: 8,
      fontFamily: "Epilogue_600SemiBold",
    },
    description: {
      fontSize: 15,
      color: COLORS.shadow,
      lineHeight: 24,
      fontFamily: "Epilogue_400Regular",
    },
    span: {
      color: COLORS.primary,
      fontWeight: "700",
    },
    list: {
      marginLeft: 8,
      marginBottom: 10,
    },
    bullet: {
      fontSize: 15,
      color: COLORS.shadow,
      lineHeight: 24,
      fontFamily: "Epilogue_400Regular",
    },
    slogan: {
      fontSize: 16,
      color: COLORS.primary,
      textAlign: "center",
      marginTop: 24,
      fontWeight: "600",
      fontFamily: "Epilogue_600SemiBold",
      margin: 24,
    },
  });
