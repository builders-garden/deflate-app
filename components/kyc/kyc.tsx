import { View, Image, TouchableOpacity } from "react-native";
import { DeflateText } from "@/components/deflate-text";
import { KycLinkResponse, KycStatus } from "@/lib/api/kyc";
import * as WebBrowser from "expo-web-browser";

interface KYCProps {
  formData: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  kycLink: KycLinkResponse;
  onSubmitKyc: () => void;
}

export function KYC({ formData, kycLink, onSubmitKyc }: KYCProps) {
  console.log(kycLink);

  return (
    <View className="flex-1 flex flex-col">
      <DeflateText
        text="Identity verification"
        className="text-[48px] text-[#3B2086] mb-6"
        font="BG_ExtraBold"
      />
      {kycLink.kycStatus === KycStatus.NOT_STARTED && (
        <TouchableOpacity
          onPress={() => {
            WebBrowser.openBrowserAsync(kycLink.kycLink)
              .then(() => {
                onSubmitKyc();
              })
              .catch(() => {});
          }}
        >
          <View className="bg-[#3B2086] rounded-[20px] p-4 flex-row items-center justify-between mb-6">
            <View>
              <DeflateText
                text="Not started"
                className="text-[24px] text-white"
                font="BG_Bold"
              />
              <DeflateText
                text="Click here to start the KYC process"
                className="text-[16px] text-white"
              />
            </View>
            <Image
              source={require("@/assets/images/right-arrow.png")}
              className="h-[36px] w-[36px] mr-3"
            />
          </View>
        </TouchableOpacity>
      )}
      {kycLink.kycStatus === KycStatus.APPROVED && (
        <View className="bg-[#3B2086] rounded-[20px] p-4 flex-row items-center mb-6">
          <Image
            source={require("@/assets/images/check.png")}
            className="h-[48px] w-[48px] mr-3"
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
      )}
      {kycLink.kycStatus === KycStatus.PENDING && (
        <View className="bg-[#3B2086] rounded-[20px] p-4 flex-row items-center mb-6">
          <Image
            source={require("@/assets/images/hourglass.png")}
            className="h-[48px] w-[48px] mr-3"
          />
          <View>
            <DeflateText
              text="Pending"
              className="text-[24px] text-white"
              font="BG_Bold"
            />
            <DeflateText
              text="Verification can take up to 2 days"
              className="text-[16px] text-white"
            />
          </View>
        </View>
      )}
      {kycLink.kycStatus === KycStatus.REJECTED && (
        <View className="bg-[#3B2086] rounded-[20px] p-4 flex-row items-center mb-6">
          <Image
            source={require("@/assets/images/error.png")}
            className="h-[48px] w-[48px] mr-3"
          />
          <View>
            <DeflateText
              text="Rejected"
              className="text-[24px] text-white"
              font="BG_Bold"
            />
            <DeflateText
              text="The verification process failed"
              className="text-[16px] text-white"
            />
          </View>
        </View>
      )}
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
          <DeflateText text="City" className="text-[16px] text-[#556FC5]/50" />
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
