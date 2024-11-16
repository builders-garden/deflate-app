import { DeflateText } from "@/components/deflate-text";
import { DeflateButton } from "@/components/deflate-button";
import { DeflateInput } from "@/components/deflate-input";
import { router } from "expo-router";
import { SafeAreaView, TouchableOpacity, Image, View } from "react-native";
import { useState } from "react";
import { useFetchBankAccount } from "@/hooks/useFetchBankAccount";
import { useCreateBankAccount } from "@/hooks/useCreateBankAccount";
import { useDeleteBankAccount } from "@/hooks/useDeleteBankAccount";

export default function BankAccountScreen() {
  const { bankAccount, isLoading, refetch } = useFetchBankAccount();
  const { deleteBankAccount, isLoading: isDeletingBankAccount } =
    useDeleteBankAccount();

  const handleDisconnect = async () => {
    try {
      await deleteBankAccount();
      refetch();
    } catch (error) {
      console.error("Failed to disconnect bank account:", error);
    }
  };

  if (isLoading || isDeletingBankAccount) {
    return (
      <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col px-[48px]">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/left-arrow.png")}
            height={36}
            width={36}
            className="h-[36px] w-[36px] mb-6"
          />
        </TouchableOpacity>
        <View className="flex-1 flex flex-col justify-center items-center">
          <DeflateText text="Loading..." />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen flex flex-col px-[48px]">
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={require("@/assets/images/left-arrow.png")}
          height={36}
          width={36}
          className="h-[36px] w-[36px] mb-6"
        />
      </TouchableOpacity>
      <View className="flex-1 flex flex-col justify-center items-center"></View>
    </SafeAreaView>
  );
}
