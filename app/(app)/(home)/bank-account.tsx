import { DeflateText } from "@/components/deflate-text";
import { DeflateButton } from "@/components/deflate-button";
import { DeflateInput } from "@/components/deflate-input";
import { router } from "expo-router";
import { SafeAreaView, TouchableOpacity, Image, View } from "react-native";
import { useState } from "react";
import { useFetchBankAccount } from "@/hooks/useFetchBankAccount";
import { useDeleteBankAccount } from "@/hooks/useDeleteBankAccount";
import { useFetchWithdrawals } from "@/hooks/useFetchWithdrawals";
import DeflateLoading from "@/components/deflate-loading";
import { useCreateBankAccount } from "@/hooks/useCreateBankAccount";

export default function BankAccountScreen() {
  const { bankAccount, isLoading, refetch } = useFetchBankAccount();
  const { createBankAccount, isLoading: isCreatingBankAccount } =
    useCreateBankAccount();
  const { deleteBankAccount, isLoading: isDeletingBankAccount } =
    useDeleteBankAccount();
  const { withdrawals, isLoading: isLoadingWithdrawals } =
    useFetchWithdrawals();
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");

  const handleCreateBankAccount = async () => {
    await createBankAccount({ accountNumber: iban, routingNumber: bic });
    refetch();
  };

  const handleDisconnect = async () => {
    try {
      await deleteBankAccount();
      refetch();
    } catch (error) {
      console.error("Failed to disconnect bank account:", error);
    }
  };

  if (isLoading || isDeletingBankAccount) {
    return <DeflateLoading />;
  }

  return (
    <SafeAreaView className="bg-[#B6BCF9] h-screen">
      <View className="flex flex-col px-[24px] h-full gap-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/left-arrow.png")}
            height={36}
            width={36}
            className="h-[36px] w-[36px]"
          />
        </TouchableOpacity>

        <View className="flex-1 flex flex-col gap-6">
          {!bankAccount ? (
            <>
              <DeflateText
                text="Setup your bank account"
                className="text-[36px] text-[#3B2086] mb-2"
                font="BG_ExtraBold"
              />
              <DeflateText
                text="It will be used for withdrawals only"
                className="text-[20px] text-[#3B2086] mb-6"
              />
              <DeflateInput
                placeholder="IBAN"
                value={iban}
                onValueChange={setIban}
              />
              <View className="h-4" />
              <DeflateInput
                placeholder="BIC / SWIFT code"
                value={bic}
                onValueChange={setBic}
              />
              <View className="flex-1" />
              <DeflateButton
                text="Confirm"
                className="mb-8"
                textClassName="text-white text-[24px]"
                onPress={handleCreateBankAccount}
              />
            </>
          ) : (
            <>
              <View className="flex flex-col gap-2">
                <DeflateText
                  text="Bank account details"
                  className="text-[36px] text-[#3B2086]"
                  font="BG_ExtraBold"
                />
                <DeflateText
                  text="This is used for withdrawals only"
                  className="text-[20px] text-[#3B2086]"
                />
              </View>

              <View className="border-2 border-[#3B2086] rounded-xl p-4 flex flex-col gap-6">
                <View className="flex flex-col">
                  <DeflateText
                    text="Fullname"
                    className="text-sm text-[#556FC5]/50"
                    font="BG_SemiBold"
                  />
                  <DeflateText
                    text={`${bankAccount.firstName} ${bankAccount.lastName}`}
                    className="text-2xl text-[#3B2086]"
                    font="BG_Medium"
                  />
                </View>

                <View className="flex flex-col">
                  <DeflateText
                    text="IBAN"
                    className="text-sm text-[#556FC5]/50"
                    font="BG_SemiBold"
                  />
                  <DeflateText
                    text={`********${bankAccount.iban?.last_4}`}
                    className="text-2xl text-[#3B2086]"
                    font="BG_Medium"
                  />
                </View>

                <View className="flex flex-col">
                  <DeflateText
                    text="BIC / SWIFT code"
                    className="text-sm text-[#556FC5]/50"
                    font="BG_SemiBold"
                  />
                  <DeflateText
                    text={bankAccount.iban?.bic!}
                    className="text-2xl text-[#3B2086]"
                    font="BG_Medium"
                  />
                </View>

                <DeflateButton
                  className="w-full rounded-lg"
                  text="DISCONNECT"
                  onPress={handleDisconnect}
                />
              </View>

              <View className="flex flex-col gap-2">
                <DeflateText
                  text="Withdrawal history"
                  className="text-[36px] text-[#3B2086]"
                  font="BG_ExtraBold"
                />
                <DeflateText
                  text={
                    withdrawals && withdrawals?.data?.length! > 0
                      ? "List of all withdrawals to your bank account"
                      : "No withdrawals yet"
                  }
                  className="text-[20px] text-[#3B2086]"
                />
              </View>

              {withdrawals?.data.map((withdrawal) => (
                <View
                  key={withdrawal.id}
                  className="border-2 border-[#4E4B66] rounded-xl p-4 flex-row justify-between items-center"
                >
                  <DeflateText text={`$${withdrawal.amount}`} />
                  <View className="flex-row items-center gap-2">
                    <DeflateText text={withdrawal.createdAt} />
                    <View
                      className={`px-2 py-1 rounded ${
                        withdrawal.status === "PENDING"
                          ? "bg-yellow-200"
                          : "bg-green-200"
                      }`}
                    >
                      <DeflateText
                        text={withdrawal.status}
                        className="text-sm uppercase"
                      />
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
