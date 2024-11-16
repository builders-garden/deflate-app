import { DeflateText } from "@/components/deflate-text";
import { SafeAreaView, View } from "react-native";

export default function InviteFriendsScreen() {
  return (
    <SafeAreaView className="bg-[#3B2086] h-screen">
      <View className="flex flex-col h-full px-[24px] justify-between">
        <DeflateText text="Ciao" />
      </View>
    </SafeAreaView>
  );
}
