import { DeflateText } from "@/components/deflate-text";
import { usePrivy } from "@privy-io/expo";
import { Redirect, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user, isReady } = usePrivy();

  if (!user && isReady) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col justify-between px-[24px]">
        <TouchableOpacity onPress={() => router.push("/(app)/(home)/profile")}>
          <View className="rounded-full h-[64px] w-[64px] bg-[#556FC5]/50 flex items-center justify-center">
            <DeflateText text="L" className="text-[36px] text-[#3B2086]" />
          </View>
        </TouchableOpacity>
        <View className="flex flex-col items-center justify-center">
          <DeflateText
            text="My wallet"
            className="text-[24px] text-[#3B2086]"
          />
          <DeflateText
            text="$46,490"
            className="text-[64px] text-[#3B2086]"
            font="BG_Bold"
          />
          <View className="bg-white h-[32px] rounded-full flex items-center justify-center w-[100px]">
            <DeflateText
              text="+54%"
              className="text-emerald-500 text-[24px]"
              font="BG_Bold"
            />
          </View>
          <View className="flex flex-row items-center justify-center gap-x-8 mt-4">
            <View className="flex flex-col items-center justify-center">
              <View className="rounded-full flex items-center justify-center">
                <TouchableOpacity>
                  <Image
                    source={require("@/assets/images/deposit.png")}
                    height={54}
                    width={54}
                    className="h-[54px] w-[54px]"
                  />
                </TouchableOpacity>
                <DeflateText
                  text="Deposit"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                  font="BG_Medium"
                />
              </View>
            </View>
            <View className="flex flex-col items-center justify-center">
              <View className="rounded-full flex items-center justify-center">
                <TouchableOpacity>
                  <Image
                    source={require("@/assets/images/withdraw.png")}
                    height={54}
                    width={54}
                    className="h-[54px] w-[54px]"
                  />
                </TouchableOpacity>
                <DeflateText
                  text="Withdraw"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                  font="BG_Medium"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="bg-white rounded-[20px] w-full h-[86px] flex flex-row items-center px-5">
          <Text className="text-[48px] mr-3">😁</Text>
          <View className="flex flex-col">
            <DeflateText
              text="Safe mode"
              className="text-[20px]"
              font="BG_Bold"
            />
            <DeflateText
              text="Low-risk saving strategy"
              className="text-[12px] text-[#8F8F91] tracking-normal"
              font="BG_Medium"
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
