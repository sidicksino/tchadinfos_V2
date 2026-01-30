import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";

// Fonts Epilogue
import {
  Epilogue_400Regular,
  Epilogue_500Medium,
  Epilogue_700Bold,
  useFonts as useEpilogueFonts,
} from "@expo-google-fonts/epilogue";

// Fonts Eagle Lake
import { EagleLake_400Regular, useFonts as useEagleLakeFonts } from "@expo-google-fonts/eagle-lake";

// Fonts Tangerine
import Loading from "@/components/loading";
import {
  Tangerine_400Regular,
  Tangerine_700Bold,
  useFonts as useTangerineFonts,
} from "@expo-google-fonts/tangerine";

// Objet central pour toutes les polices
export const FONTS = {
  Epilogue_Regular: "Epilogue_400Regular",
  Epilogue_Medium: "Epilogue_500Medium",
  Epilogue_Bold: "Epilogue_700Bold",
  EagleLake: "EagleLake_400Regular",
  Tangerine_Regular: "Tangerine_400Regular",
  Tangerine_Bold: "Tangerine_700Bold",
};

export default function RootLayout() {
  // Charger toutes les polices
  const [epilogueLoaded] = useEpilogueFonts({
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_700Bold,
  });

  const [eagleLakeLoaded] = useEagleLakeFonts({
    EagleLake_400Regular,
  });

  const [tangerineLoaded] = useTangerineFonts({
    Tangerine_400Regular,
    Tangerine_700Bold,
  });

  if (!epilogueLoaded || !eagleLakeLoaded || !tangerineLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
