import { DeflateText } from "@/components/deflate-text";
import { DeflateButton } from "@/components/deflate-button";
import { DeflateInput } from "@/components/deflate-input";
import { useCreateKYC } from "@/hooks/useCreateKYC";
import { useFetchKYC } from "@/hooks/useFetchKYC";
import { router } from "expo-router";
import { SafeAreaView, TouchableOpacity, Image, View } from "react-native";
import { useState } from "react";
import { KycStatus } from "@/lib/api/kyc";
import { TOS } from "@/components/kyc/tos";
import { KYC } from "@/components/kyc/kyc";
import { KYCForm } from "@/components/kyc/kyc-form";

export default function KYCScreen() {
  const { kycLink, isLoading, error } = useFetchKYC();
  const {
    createKYC,
    isLoading: isCreatingKYC,
    error: createKYCError,
  } = useCreateKYC();

  const [tosAccepted, setTosAccepted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  return (
    <>
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col px-[48px]">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/left-arrow.png")}
            height={36}
            width={36}
            className="h-[36px] w-[36px] mb-6"
          />
        </TouchableOpacity>
        {!tosAccepted && !kycLink && (
          <TOS onAccept={() => setTosAccepted(true)} />
        )}
        {tosAccepted && !kycLink && (
          <KYCForm
            formData={formData}
            onSubmit={() => {}}
            onValueChange={() => {}}
          />
        )}
        {kycLink?.kycStatus === KycStatus.APPROVED && (
          <KYC formData={formData} />
        )}
      </SafeAreaView>
    </>
  );
}
