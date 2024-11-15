import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="login" /> */}
    </Stack>
  );
}
