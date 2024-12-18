import { DeflateText } from "@/components/deflate-text";
import { useFetchKYC } from "@/hooks/useFetchKYC";
import { KycStatus } from "@/lib/api/kyc";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = usePrivy();
  const { kycLink } = useFetchKYC();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col px-[24px]"></SafeAreaView>
      </>
    );
  }

  return (
    <>
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col px-[24px]">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-[36px] w-[36px]"
        >
          <Image
            source={require("@/assets/images/left-arrow.png")}
            height={24}
            width={24}
            className="h-[36px] w-[36px]"
          />
        </TouchableOpacity>
        <View className="flex flex-col items-center justify-center">
          <View className="rounded-full h-[90px] w-[90px] bg-[#556FC5]/50 flex items-center justify-center">
            <DeflateText
              text={user!
                .custom_metadata!.username.toString()
                .charAt(0)
                .toUpperCase()}
              className="text-[54px] text-[#3B2086]"
              font="BG_Bold"
            />
          </View>
          {!user?.custom_metadata?.fullName && (
            <DeflateText
              text={user!.custom_metadata!.username.toString()}
              className="text-[36px] text-[#3B2086]"
              font="BG_SemiBold"
            />
          )}
          {user?.custom_metadata?.fullName && (
            <>
              <DeflateText
                text={user!.custom_metadata!.fullName.toString()}
                className="text-[36px] text-[#3B2086]"
                font="BG_SemiBold"
              />
              <DeflateText
                text={`@${user!.custom_metadata!.username.toString()}`}
                className="text-[24px] text-[#556FC5]/50 mb-8"
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              router.push("/(app)/(home)/invite");
            }}
            className="w-full"
          >
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
          </TouchableOpacity>
        </View>
        <View className="w-full rounded-[20px] border-4 border-[#3B2086] p-4 flex flex-col gap-y-6">
          <TouchableOpacity onPress={() => router.push("/(app)/(home)/kyc")}>
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
          <TouchableOpacity
            disabled={kycLink?.kycStatus !== KycStatus.APPROVED}
            onPress={() => router.push("/bank-account")}
            className={
              kycLink?.kycStatus !== KycStatus.APPROVED ? "opacity-50" : ""
            }
          >
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
          <TouchableOpacity
            onPress={() => router.push("/(app)/(onboarding)/select-mode")}
          >
            <View className="flex flex-row items-center gap-x-4">
              <Image
                source={require("@/assets/images/refresh.png")}
                height={48}
                width={48}
                className="h-[48px] w-[48px]"
              />
              <View className="flex flex-col">
                <DeflateText
                  text="Change mode"
                  className="text-[24px] text-[#3B2086]"
                  font="BG_Bold"
                />
                <DeflateText
                  text="Switch to another saving mode"
                  className="text-[16px] text-[#3B2086] tracking-normal"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={async () => {
            logout();
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
