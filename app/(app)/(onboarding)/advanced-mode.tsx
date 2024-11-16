import { DeflateButton } from "@/components/deflate-button";
import { DeflateInput } from "@/components/deflate-input";
import { DeflateText } from "@/components/deflate-text";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const { user } = usePrivy();
  const [username, setUsername] = useState<string>("");
  const [answer1, setAnswer1] = useState<string | undefined>(
    user?.custom_metadata?.answer1 as string
  );
  const [answer2, setAnswer2] = useState<string | undefined>(
    user?.custom_metadata?.answer2 as string
  );
  const [answer3, setAnswer3] = useState<string | undefined>(
    user?.custom_metadata?.answer3 as string
  );

  const { updateUser } = useUpdateUser();

  const handleConfirm = async () => {
    await updateUser({ answer1, answer2, answer3, mode: "advanced" });
    router.push("/(app)/(home)");
  };

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col justify-between px-[32px]">
      <View className="flex flex-col">
        <DeflateText
          text="More about you"
          className="text-[64px] text-[#3B2086] mb-6"
          font="BG_ExtraBold"
        />
        <View className="flex flex-col gap-4 mb-6">
          <DeflateText
            text="What's your main investing goal?"
            className="text-[20px] text-[#3B2086]"
            font="BG_SemiBold"
          />
          <View className="flex flex-col gap-2">
            {["Protect capital", "Steady growth", "High returns"].map(
              (option) => (
                <DeflateButton
                  key={option}
                  text={option}
                  textClassName={
                    answer1 === option ? "text-white" : "text-[#3B2086]"
                  }
                  className={`w-full rounded-lg ${
                    answer1 === option
                      ? "bg-[#3B2086] text-white"
                      : "bg-transparent border-2 border-[#3B2086]"
                  }`}
                  onPress={() => setAnswer1(option)}
                />
              )
            )}
          </View>
        </View>
        <View className="flex flex-col gap-4">
          <DeflateText
            text="What would you do if your investment drops 20%?"
            className="text-[20px] text-[#3B2086]"
            font="BG_SemiBold"
          />
          <View className="flex flex-col gap-2">
            {["Sell", "Hold", "Buy more"].map((option) => (
              <DeflateButton
                key={option}
                text={option}
                textClassName={
                  answer2 === option ? "text-white" : "text-[#3B2086]"
                }
                className={`w-full rounded-lg ${
                  answer2 === option
                    ? "bg-[#3B2086] text-white"
                    : "bg-transparent border-2 border-[#3B2086]"
                }`}
                onPress={() => setAnswer2(option)}
              />
            ))}
          </View>
        </View>
        <View className="flex flex-col gap-4 mt-6">
          <DeflateText
            text="How long will you invest?"
            className="text-[20px] text-[#3B2086]"
            font="BG_SemiBold"
          />
          <View className="flex flex-col gap-2">
            {["<1 year", "1-5 years", "5+ years"].map((option) => (
              <DeflateButton
                key={option}
                text={option}
                textClassName={
                  answer3 === option ? "text-white" : "text-[#3B2086]"
                }
                className={`w-full rounded-lg ${
                  answer3 === option
                    ? "bg-[#3B2086] text-white"
                    : "bg-transparent border-2 border-[#3B2086]"
                }`}
                onPress={() => setAnswer3(option)}
              />
            ))}
          </View>
        </View>
      </View>
      <DeflateButton
        text="Confirm"
        className="w-full text-center"
        textClassName={"text-[24px] text-white"}
        disabled={!answer1 || !answer2 || !answer3}
        onPress={handleConfirm}
      />
    </SafeAreaView>
  );
}
