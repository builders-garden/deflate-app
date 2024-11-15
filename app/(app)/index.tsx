import { DeflateButton } from "@/components/deflate-button";
import { DeflateText } from "@/components/deflate-text";
import { useLogin, usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { login } = useLogin();
  const { user, isReady } = usePrivy();

  if (!isReady) {
    return (
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col items-center justify-center px-[32px]">
        <ActivityIndicator color={"#3B2086"} size="large" />
      </SafeAreaView>
    );
  }

  if (isReady && user) {
    return <Redirect href={"/(onboarding)"} />;
  }

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col items-center justify-between px-[32px]">
      <View />
      <View className="flex flex-col items-center justify-center">
        <DeflateText
          className="text-[64px] text-[#3B2086]"
          text="Deflate"
          font="BG_ExtraBold"
        />
        <DeflateText
          text="Saving smarter in an inflationary world."
          className="text-white text-[32px] text-center"
        />
      </View>
      <DeflateButton
        text="Get started"
        className="w-full text-center"
        textClassName="text-[24px]"
        onPress={() => {
          login({ loginMethods: ["email"] }).then((session) => {
            console.log("User logged in", session.user);
          });
        }}
      />
    </SafeAreaView>
  );
}
