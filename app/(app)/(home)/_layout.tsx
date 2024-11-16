import { usePrivy } from "@privy-io/expo";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

export default function HomeLayout() {
  const { getAccessToken } = usePrivy();
  const { isConnected } = useNetInfo();

  useEffect(() => {
    const refreshUserOnReconnect = async () => {
      if (isConnected) {
        await getAccessToken();
      }
      refreshUserOnReconnect();
    };
  }, [isConnected]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
}
