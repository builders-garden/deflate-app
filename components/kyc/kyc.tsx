import { View, Image } from "react-native";
import { DeflateText } from "@/components/deflate-text";

interface KYCProps {
  formData: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export function KYC({ formData }: KYCProps) {
  return (
    <View className="flex-1 flex flex-col">
      <DeflateText
        text="Identity verification"
        className="text-[48px] text-[#3B2086] mb-6"
        font="BG_ExtraBold"
      />
      <View className="bg-[#3B2086] rounded-[20px] p-4 flex-row items-center mb-6">
        <Image
          source={require("@/assets/images/check.png")}
          className="h-[24px] w-[24px] mr-3"
        />
        <View>
          <DeflateText
            text="Approved"
            className="text-[24px] text-white"
            font="BG_Bold"
          />
          <DeflateText
            text="Your identity is verified"
            className="text-[16px] text-white"
          />
        </View>
      </View>
      <View className="border-4 border-[#3B2086] rounded-[20px] p-4">
        <View className="mb-4">
          <DeflateText
            text="Fullname"
            className="text-[16px] text-[#556FC5]/50"
          />
          <DeflateText
            text={formData.fullName}
            className="text-[24px] text-[#3B2086]"
            font="BG_Bold"
          />
        </View>
        <View className="mb-4">
          <DeflateText
            text="Address"
            className="text-[16px] text-[#556FC5]/50"
          />
          <DeflateText
            text={formData.address}
            className="text-[24px] text-[#3B2086]"
            font="BG_Bold"
          />
        </View>
        <View className="mb-4">
          <DeflateText
            text="City"
            className="text-[16px] text-[#556FC5]/50"
          />
          <DeflateText
            text={formData.city}
            className="text-[24px] text-[#3B2086]"
            font="BG_Bold"
          />
        </View>
        <View className="mb-4">
          <DeflateText
            text="Postal code"
            className="text-[16px] text-[#556FC5]/50"
          />
          <DeflateText
            text={formData.postalCode}
            className="text-[24px] text-[#3B2086]"
            font="BG_Bold"
          />
        </View>
        <View className="mb-4">
          <DeflateText
            text="Country"
            className="text-[16px] text-[#556FC5]/50"
          />
          <DeflateText
            text={formData.country}
            className="text-[24px] text-[#3B2086]"
            font="BG_Bold"
          />
        </View>
      </View>
    </View>
  );
} 