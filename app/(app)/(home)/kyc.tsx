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
import DeflateLoading from "@/components/deflate-loading";

export default function KYCScreen() {
  const { user } = usePrivy();
  const { kycLink, isLoading, error, fetchKYC } = useFetchKYC();
  const {
    createKYC,
    isLoading: isCreatingKYC,
    error: createKYCError,
  } = useCreateKYC();
  const [showData, setShowData] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  if (isLoading) {
    return <DeflateLoading />;
  }

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen-safe-offset-5">
      <View className="flex flex-col px-[24px] h-full">
        <View className="flex flex-row w-full justify-between items-center">
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
          {showData ? (
            <TouchableOpacity
              onPress={() => setShowData(false)}
              className="h-[36px] w-[36px] mb-4"
            >
              <Image
                source={require("@/assets/images/eye-closed.png")}
                height={36}
                width={36}
                className="h-[36px] w-[36px] mb-6"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setShowData(true)}
              className="h-[36px] w-[36px] mb-4"
            >
              <Image
                source={require("@/assets/images/eye.png")}
                height={36}
                width={36}
                className="h-[36px] w-[36px] mb-6"
              />
            </TouchableOpacity>
          )}
        </View>
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
            showData={showData}
            onSubmitKyc={async () => await fetchKYC()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
