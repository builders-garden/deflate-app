import { SafeAreaView, View } from "react-native";
import { DeflateText } from "@/components/deflate-text";
import { DeflateButton } from "@/components/deflate-button";
import * as WebBrowser from "expo-web-browser";

interface TOSProps {
  tosLink: string;
  onAccept: () => void;
}

export function TOS({ onAccept, tosLink }: TOSProps) {
  return (
    <SafeAreaView className="flex flex-col h-full justify-between">
      <View className="flex flex-col">
        <DeflateText
          text="Terms of service"
          className="text-[48px] text-[#3B2086] mb-2"
          font="BG_ExtraBold"
        />
        <DeflateText
          text="Accept the Terms of Service to start your identity verification process."
          className="text-[20px] text-[#3B2086]"
        />
      </View>
      <DeflateButton
        text="Terms of Service"
        className="w-full text-center"
        textClassName="text-[24px]"
        onPress={() =>
          WebBrowser.openBrowserAsync(tosLink)
            .then(() => onAccept())
            .catch(() => {})
        }
      />
    </SafeAreaView>
  );
}
