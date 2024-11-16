import { View } from "react-native";
import { DeflateText } from "@/components/deflate-text";
import { DeflateButton } from "@/components/deflate-button";
import { DeflateInput } from "@/components/deflate-input";

interface FormData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface KYCFormProps {
  formData: FormData;
  onSubmit: (data: FormData) => void;
  onValueChange: (data: FormData) => void;
}

export function KYCForm({ formData, onSubmit, onValueChange }: KYCFormProps) {
  return (
    <View className="flex-1 flex flex-col">
      <DeflateText
        text="Identity verification"
        className="text-[48px] text-[#3B2086] mb-2"
        font="BG_ExtraBold"
      />
      <DeflateText
        text="This is needed for AML reasons"
        className="text-[20px] text-[#3B2086] mb-6"
      />
      <View className="flex flex-col gap-y-4">
        <DeflateInput
          placeholder="Fullname"
          value={formData.fullName}
          onValueChange={(value) =>
            onValueChange({ ...formData, fullName: value })
          }
        />
        <DeflateInput
          placeholder="Address"
          value={formData.address}
          onValueChange={(value) =>
            onValueChange({ ...formData, address: value })
          }
        />
        <DeflateInput
          placeholder="City"
          value={formData.city}
          onValueChange={(value) => onValueChange({ ...formData, city: value })}
        />
        <DeflateInput
          placeholder="Postal code"
          value={formData.postalCode}
          onValueChange={(value) =>
            onValueChange({ ...formData, postalCode: value })
          }
        />
        <DeflateInput
          placeholder="Country"
          value={formData.country}
          onValueChange={(value) =>
            onValueChange({ ...formData, country: value })
          }
        />
      </View>
      <View className="mt-auto">
        <DeflateButton
          text="Start"
          className="w-full text-center"
          textClassName="text-[24px]"
          onPress={() => onSubmit(formData)}
        />
      </View>
    </View>
  );
} 