import { ThemeContext } from "@/context/ThemeContext";
import React, { ReactNode, useContext } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeScreenProps = {
  children: ReactNode;
};

const SafeScreenTabs: React.FC<SafeScreenProps> = ({ children }) => {
  const { COLORS } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreenTabs;
