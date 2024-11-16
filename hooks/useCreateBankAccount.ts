import { usePrivy } from "@privy-io/expo";
import { useState } from "react";
import { createBankAccount, BankAccount } from "../lib/api/bank-accounts";

export function useCreateBankAccount() {
  const { user, getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);

  const createBankAccountMutation = async ({
    accountNumber,
    routingNumber,
  }: {
    accountNumber: string;
    routingNumber: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await createBankAccount({
        token,
        data: { accountNumber, routingNumber },
      });

      setBankAccount(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create bank account"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBankAccount: createBankAccountMutation,
    isLoading,
    error,
    bankAccount,
  };
}
