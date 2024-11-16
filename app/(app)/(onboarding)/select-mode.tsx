import { DeflateButton } from "@/components/deflate-button";
import { DeflateText } from "@/components/deflate-text";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { initializeBiconomySmartAccount } from "@/lib/biconomy";
import { isNotCreated, useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { base } from "viem/chains";

export default function SelectModeScreen() {
  const { user, getAccessToken } = usePrivy();
  const [selectedMode, setSelectedMode] = useState<string>(
    (user?.custom_metadata?.mode as string) || "safe"
  );
  const { updateUser } = useUpdateUser();
  const wallet = useEmbeddedWallet();

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col justify-between px-[32px]">
      <View className="flex flex-col">
        <DeflateText
          text="Select your mode"
          className="text-[64px] text-[#3B2086] mb-6"
          font="BG_ExtraBold"
        />
        <View
          className={`rounded-xl w-full h-[170px] flex flex-col justify-between ${
            selectedMode === "safe" && "bg-white p-4 border-4 border-white"
          }  ${
            selectedMode === "advanced" && "border-4 border-[#3B2086] p-4"
          } mb-4`}
          onTouchEnd={() => setSelectedMode("safe")}
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="text-[40px]">😄</Text>
            <View className="rounded-full bg-[#3B2086] px-4 py-2">
              <DeflateText
                text="RECOMMENDED"
                font="BG_ExtraBold"
                className="text-white text-[20px]"
              />
            </View>
          </View>
          <View className="flex flex-col">
            <DeflateText
              text="Safe mode"
              className="text-[36px] text-[#3B2086]"
              font="BG_Bold"
            />
            <DeflateText
              text="Low-risk saving strategy"
              className={`text-[24px] ${
                selectedMode === "safe" ? "text-[#B6BCF9]" : "text-[#556FC5]/50"
              }`}
              font="BG_Medium"
            />
          </View>
        </View>
        <View
          className={`rounded-xl w-full h-[170px] flex flex-col justify-between ${
            selectedMode === "advanced" && "bg-white p-4 border-4 border-white"
          }  ${
            selectedMode === "safe" && "border-4 border-[#3B2086] p-4"
          } mb-4`}
          onTouchEnd={() => setSelectedMode("advanced")}
        >
          <View className="flex flex-row justify-between items-center">
            <Text className="text-[40px]">⚡</Text>
          </View>
          <View className="flex flex-col">
            <DeflateText
              text="Advanced mode"
              className="text-[36px] text-[#3B2086]"
              font="BG_Bold"
            />
            <DeflateText
              text="Automated trading strategy"
              className={`text-[24px] ${
                selectedMode === "advanced"
                  ? "text-[#B6BCF9]"
                  : "text-[#556FC5]/50"
              }`}
              font="BG_Medium"
            />
          </View>
        </View>
      </View>
      <DeflateButton
        text="Continue"
        className="w-full text-center"
        textClassName="text-[24px] text-white"
        onPress={async () => {
          if (selectedMode === "safe") {
            await updateUser({ mode: "safe" });
            await getAccessToken();
            if (isNotCreated(wallet)) {
              await wallet.create({ recoveryMethod: "privy" });
              router.push("/(app)/(home)");
            } else {
              router.push("/(app)/(home)");
            }
          } else {
            router.push("/(app)/(onboarding)/advanced-mode");
          }
        }}
      />
    </SafeAreaView>
  );
}
