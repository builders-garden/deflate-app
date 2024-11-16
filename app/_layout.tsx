import "../styles/globals.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PrivyElements, PrivyProvider } from "@privy-io/expo";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { base, polygon } from "viem/chains";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    BG_Bold: require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
    BG_Regular: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    BG_Medium: require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
    BG_SemiBold: require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    BG_ExtraBold: require("../assets/fonts/BricolageGrotesque-ExtraBold.ttf"),
    BG_ExtraLight: require("../assets/fonts/BricolageGrotesque-ExtraLight.ttf"),
    BG_Light: require("../assets/fonts/BricolageGrotesque-Light.ttf"),
  });
  const [interLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (loaded && interLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, interLoaded]);

  if (!loaded || !interLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <PrivyProvider
          appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!}
          clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID!}
          supportedChains={[base, polygon]}
          config={{}}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
          <PrivyElements />
        </PrivyProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
