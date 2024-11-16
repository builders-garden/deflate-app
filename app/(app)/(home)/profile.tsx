import { DeflateText } from "@/components/deflate-text";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, isReady, logout } = usePrivy();

  return (
    <>
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col px-[24px]">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/close.png")}
            height={24}
            width={24}
            className="h-[24px] w-[24px]"
          />
        </TouchableOpacity>
        <View className="flex flex-col items-center justify-center">
          <View className="rounded-full h-[90px] w-[90px] bg-[#556FC5]/50 flex items-center justify-center">
            <DeflateText text="L" className="text-[54px] text-[#3B2086]" />
          </View>
          <DeflateText
            text="Simone Staffa"
            className="text-[36px] text-[#3B2086]"
            font="BG_SemiBold"
          />
          <DeflateText
            text="@limone"
            className="text-[24px] text-[#556FC5]/50 mb-8"
          />
          <View className="h-[86px] w-full rounded-[20px] p-4 bg-[#3B2086] flex flex-row items-center gap-x-4 mb-4">
            <Image
              source={require("@/assets/images/invite.png")}
              height={48}
              width={48}
              className="h-[48px] w-[48px]"
            />
            <View className="flex flex-col">
              <DeflateText
                text="Invite friends"
                className="text-[24px] text-white"
                font="BG_Bold"
              />
              <DeflateText
                text="Earn $5 per invite (up to $25)"
                className="text-[16px] text-white tracking-normal"
              />
            </View>
          </View>
        </View>
        <View className="w-full rounded-[20px] border-4 border-[#3B2086] p-4 flex flex-col gap-y-6">
          <TouchableOpacity onPress={() => router.push("/kyc")}>
            <View className="flex flex-row items-center gap-x-4">
              <Image
                source={require("@/assets/images/identity.png")}
                height={48}
                width={48}
                className="h-[48px] w-[48px]"
              />
              <View className="flex flex-col">
                <DeflateText
                  text="Identity Verification"
                  className="text-[24px] text-[#3B2086]"
                  font="BG_Bold"
                />
                <DeflateText
                  text="Verify your identity"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/bank-account")}>
            <View className="flex flex-row items-center gap-x-4">
              <Image
                source={require("@/assets/images/banknote.png")}
                height={48}
                width={48}
                className="h-[48px] w-[48px]"
              />
              <View className="flex flex-col">
                <DeflateText
                  text="Bank Account"
                  className="text-[24px] text-[#3B2086]"
                  font="BG_Bold"
                />
                <DeflateText
                  text="Change your connected account"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={async () => {
            logout().then(() => {
              console.log(user);
              router.replace("/");
            });
          }}
          className="mt-auto mb-8"
        >
          <DeflateText
            text="Logout"
            className="text-[24px] text-[#3B2086] text-center"
            font="BG_Bold"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
