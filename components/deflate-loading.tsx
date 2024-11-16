import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

export default function DeflateLoading() {
  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen">
      <View className="flex flex-col px-[24px] h-full">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/left-arrow.png")}
            height={36}
            width={36}
            className="h-[36px] w-[36px] mb-6"
          />
        </TouchableOpacity>
        <View className="flex-1 flex flex-col justify-center items-center">
          <ActivityIndicator color={"#3B2086"} size="large" />
        </View>
      </View>
    </SafeAreaView>
  );
}
