import LogoRouge from "@/assets/images/logoRouge.svg";
import { getStyles } from "@/assets/styles/profile.Style";
import SafeScreenScondaire from "@/components/SafeScreenScondaaire";
import HeaderSecondaire from "@/components/headerSecondaire";
import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const router = useRouter();
  const [isLoged, setIsLoading] = useState(false);
  const { COLORS } = useContext(ThemeContext);
  const styles = getStyles(COLORS);

  const AboutHandled = () => {
      router.push("/pages/about");
  };

  return (
    <SafeScreenScondaire>
      {isLoged ? (
        <>
          <HeaderSecondaire />
          <View style={styles.contenair}>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.buttonTextLive}>Register</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.headerLoged}>
            <LogoRouge />
            <View>
              <Image
                source={require("../../assets/images/phote.jpeg")}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editIcon}>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>Sidick Abdoulaye</Text>
            <Text style={styles.userEmail}>sidickabdoulayesino1@gmail.com</Text>
          </View>
          <View style={styles.contenair}>
            <View style={styles.setting}>
              <View style={styles.content}>
                <TouchableOpacity style={styles.profileSetting}>
                  <View style={styles.flex}>
                    <FontAwesome6
                      name="contact-book"
                      size={24}
                      color={COLORS.text}
                    />
                    <Text style={styles.text}>Contact</Text>
                  </View>
                  <AntDesign name="right" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <TouchableOpacity style={styles.profileSetting}>
                  <View style={styles.flex}>
                    <Ionicons
                      name="language-outline"
                      size={24}
                      color={COLORS.text}
                    />
                    <Text style={styles.text}>Langue</Text>
                  </View>
                  <AntDesign name="right" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <TouchableOpacity style={styles.profileSetting} onPress={AboutHandled}>
                  <View style={styles.flex}>
                    <AntDesign
                      name="info-circle"
                      size={24}
                      color={COLORS.text}
                    />
                    <Text style={styles.text}>À propos</Text>
                  </View>
                  <AntDesign name="right" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <TouchableOpacity style={styles.profileSetting}>
                  <View style={styles.flex}>
                    <Ionicons
                      name="invert-mode"
                      size={24}
                      color={COLORS.text}
                    />
                    <Text style={styles.text}>Theme</Text>
                  </View>
                  <AntDesign name="right" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <TouchableOpacity style={styles.profileSetting}>
                  <View style={styles.flex}>
                    <Ionicons
                      name="log-out-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                    <Text style={[styles.text, { color: COLORS.primary }]}>
                      Déconnexion
                    </Text>
                  </View>
                  <AntDesign name="right" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeScreenScondaire>
  );
};

export default profile;
