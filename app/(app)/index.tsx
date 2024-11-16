import { DeflateButton } from "@/components/deflate-button";
import { DeflateText } from "@/components/deflate-text";
import { useLogin, usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { login } = useLogin();
  const { user, isReady } = usePrivy();

  if (!isReady && !user) {
    return (
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col items-center justify-center px-[32px]">
        <ActivityIndicator color={"#3B2086"} size="large" />
      </SafeAreaView>
    );
  }

  if (user) {
    if (!user.custom_metadata || !user.custom_metadata.username) {
      return <Redirect href={"/(onboarding)"} />;
    }

    return <Redirect href={"/(home)"} />;
  }

  return (
    <SafeAreaView className="h-screen bg-[#B6BCF9] flex flex-col items-center justify-between px-[32px]">
      <View />
      <View className="flex flex-col items-center justify-center">
        <Text className="text-[96px]">🎈</Text>
        <DeflateText
          className="text-[64px] text-[#3B2086]"
          text="Deflate"
          font="BG_ExtraBold"
        />
        <DeflateText
          text="Saving smarter in an inflationary world."
          className="text-white text-[32px] text-center"
          font="BG_Bold"
        />
      </View>
      <DeflateButton
        text="Get started"
        className="w-full text-center"
        textClassName="text-[24px] text-white"
        onPress={() => {
          login({ loginMethods: ["email"] }).then((session) => {
            console.log("User logged in", session.user);
          });
        }}
      />
    </SafeAreaView>
  );
}
