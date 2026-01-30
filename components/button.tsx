import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { getStyles } from "../assets/styles/onboarding.Style";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const COLORS = {
  primary: "#002664",
  white: "#fff",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  color = COLORS.primary,
  textColor = COLORS.white,
  style,
  textStyle,
}) => {
  const styles = getStyles(COLORS);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
