import { DeflateButton } from "@/components/deflate-button";
import { DeflateText } from "@/components/deflate-text";
import { router } from "expo-router";
import { IndexService } from "@ethsign/sp-sdk";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Share,
} from "react-native";
import { useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { useEffect, useState } from "react";
import { AGENT_ADDRESS } from "@/constants/Agent";

export default function InviteFriendsScreen() {
  const { user } = usePrivy();
  const [invites, setInvites] = useState<number>(0);
  const wallet = useEmbeddedWallet();

  useEffect(() => {
    getSignProtocolAttestationsCount();
  }, []);

  const getSignProtocolAttestationsCount = async () => {
    const indexService = new IndexService("testnet");
    const attestations = await indexService.queryAttestationList({
      schemaId: "onchain_evm_8453_0x77",
      attester: AGENT_ADDRESS,
      page: 0,
      mode: "onchain",
      indexingValue: `deflate-${wallet.account?.address}`,
    });

    setInvites(attestations?.total || 0);
  };

  return (
    <SafeAreaView className="bg-[#3B2086] h-screen">
      <View className="flex flex-col h-full px-[24px] justify-between">
        <View className="flex-1 flex flex-col gap-4">
          <View className="flex flex-col">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-[36px] w-[36px] mb-4"
            >
              <Image
                source={require("@/assets/images/left-arrow-secondary.png")}
                height={36}
                width={36}
                className="h-[36px] w-[36px] mb-6"
              />
            </TouchableOpacity>
            <DeflateText
              text="Earn $5 for each friend you invite"
              className="text-[36px] text-[#B6BCF9]"
              font="BG_ExtraBold"
            />
          </View>
          <View className="flex flex-col gap-2">
            <DeflateText
              text="Your friends have to:"
              className="text-[20px] text-[#FFFFFF]"
            />
            <View className="w-full rounded-[20px] bg-[#B6BCF9]/50 p-4 flex flex-col items-center gap-y-6 py-6">
              <View className="w-full rounded-[20px] flex flex-row items-center gap-x-4">
                <Image
                  source={require("@/assets/images/link.png")}
                  height={48}
                  width={48}
                  className="h-[36px] w-[36px]"
                />
                <View className="flex flex-col gap-1">
                  <DeflateText
                    text="Sign up with your link"
                    className="text-[16px] text-white"
                    font="BG_SemiBold"
                  />
                  <DeflateText
                    text="Or enter your username during sign up"
                    className="text-[12px] text-white/50 tracking-normal"
                  />
                </View>
              </View>
              <View className="w-full rounded-[20px] flex flex-row items-center gap-x-4">
                <Image
                  source={require("@/assets/images/money.png")}
                  height={48}
                  width={48}
                  className="h-[36px] w-[36px]"
                />
                <View className="flex flex-col gap-1">
                  <DeflateText
                    text="Add money to their account"
                    className="text-[16px] text-white"
                    font="BG_SemiBold"
                  />
                  <DeflateText
                    text="Via debit card or bank transfer"
                    className="text-[12px] text-white/50 tracking-normal"
                  />
                </View>
              </View>
            </View>
            <DeflateText
              text={`You have invited ${
                invites > 5 ? "5" : invites
              }/5 friends and earned $${
                invites > 5 ? `25` : `${5 * invites}`
              } so far!`}
              className="text-[20px] text-[#FFFFFF]"
            />
          </View>
        </View>
        <DeflateButton
          text="Invite friends"
          textClassName="text-[#3B2086] text-[24px]"
          className="bg-[#FFFFFF]"
          onPress={async () => {
            await Share.share({
              message: `Join Deflate using this link and get $5 on your first deposit: deflate://invite?ref=${user?.custom_metadata?.username}`,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
