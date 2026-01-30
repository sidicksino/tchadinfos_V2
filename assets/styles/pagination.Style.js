import { StyleSheet } from "react-native";

export const  getStyles = (COLORS) => StyleSheet.create({
  container: {
    top: -10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#595959",
    height: 8,
    width: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});