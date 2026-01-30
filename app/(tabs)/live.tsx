import { getStyles } from "@/assets/styles/headerSecondaire";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import HeaderSecondaire from "@/components/headerSecondaire";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const live = () => {
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  return (
    <SafeScreenScondaire>
      <View style={styles.contenair}>
        <HeaderSecondaire />
        <Text style={styles.textLive}>
          Choisissez votre mode préféré pour rester connecté à l’actualité :
          regardez en direct ou écoutez la radio en direct, partout et à tout
          moment.
        </Text>

        <View style={styles.content}>
          <View style={styles.buttonLive}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="radio-outline" size={60} color={COLORS.background}/>
            </TouchableOpacity>
            <Text style={styles.buttonTextLive}>Radio Direct</Text>
          </View>
          <View style={styles.buttonLive}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="videocam-outline" size={60} color={COLORS.background}/>
            </TouchableOpacity>
            <Text style={styles.buttonTextLive}>Video Direct</Text>
          </View>
        </View>
      </View>
    </SafeScreenScondaire>
  );
};

export default live;
