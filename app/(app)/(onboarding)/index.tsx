import { DeflateButton } from "@/components/deflate-button";
import { DeflateInput } from "@/components/deflate-input";
import { DeflateText } from "@/components/deflate-text";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const { user } = usePrivy();
  const [username, setUsername] = useState<string>("");

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col justify-between px-[32px]">
      <View className="flex flex-col">
        <DeflateText
          text="Pick a username"
          className="text-[64px] text-[#3B2086] mb-6"
          font="BG_ExtraBold"
        />
        <DeflateInput
          value={username}
          onValueChange={(value) => setUsername(value.toLowerCase())}
          placeholder="Username"
        />
        {username.length < 4 && (
          <DeflateText
            text="Pick a username of at least 4 characters."
            className="text-[#3B2086] mt-2"
          />
        )}
      </View>
      <DeflateButton
        text="Continue"
        className="w-full text-center"
        textClassName="text-[24px]"
        disabled={username.length < 4}
        onPress={() => router.push("/(onboarding)/select-mode")}
      />
    </SafeAreaView>
  );
}
