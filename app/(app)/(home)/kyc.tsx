import { useCreateKYC } from "@/hooks/useCreateKYC";
import { useFetchKYC } from "@/hooks/useFetchKYC";
import { router } from "expo-router";
import { SafeAreaView, TouchableOpacity, Image, View } from "react-native";
import { useState } from "react";
import { TosStatus } from "@/lib/api/kyc";
import { TOS } from "@/components/kyc/tos";
import { KYC } from "@/components/kyc/kyc";
import { KYCForm } from "@/components/kyc/kyc-form";
import { usePrivy } from "@privy-io/expo";

export default function KYCScreen() {
  const { user } = usePrivy();
  const { kycLink, isLoading, error, fetchKYC } = useFetchKYC();
  const {
    createKYC,
    isLoading: isCreatingKYC,
    error: createKYCError,
  } = useCreateKYC();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen-safe-offset-5">
      <View className="flex flex-col px-[24px] h-full">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-[36px] w-[36px] mb-4"
        >
          <Image
            source={require("@/assets/images/left-arrow.png")}
            height={36}
            width={36}
            className="h-[36px] w-[36px] mb-6"
          />
        </TouchableOpacity>
        {kycLink && kycLink.tosStatus === TosStatus.PENDING && (
          <TOS
            tosLink={kycLink.tosLink}
            onAccept={async () => await fetchKYC()}
          />
        )}
        {!kycLink && (
          <KYCForm
            formData={formData}
            onSubmit={async () => {
              await createKYC(formData);
              await fetchKYC();
            }}
            onValueChange={(value) => setFormData(value)}
          />
        )}
        {kycLink && kycLink.tosStatus === TosStatus.APPROVED && (
          <KYC
            kycLink={kycLink}
            formData={user?.custom_metadata as typeof formData}
            onSubmitKyc={async () => await fetchKYC()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
