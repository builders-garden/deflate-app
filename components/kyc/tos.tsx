import { View } from "react-native";
import { DeflateText } from "@/components/deflate-text";
import { DeflateButton } from "@/components/deflate-button";

interface TOSProps {
  onAccept: () => void;
}

export function TOS({ onAccept }: TOSProps) {
  return (
    <View className="flex-1 flex flex-col">
      <DeflateText
        text="Terms of service"
        className="text-[48px] text-[#3B2086] mb-2"
        font="BG_ExtraBold"
      />
      <DeflateText
        text="Accept the Terms of Service to start your identity verification process"
        className="text-[20px] text-[#3B2086] mb-6"
      />
      <View className="mt-auto">
        <DeflateButton
          text="Terms of Service"
          className="w-full text-center"
          textClassName="text-[24px]"
          onPress={onAccept}
        />
      </View>
    </View>
  );
} 