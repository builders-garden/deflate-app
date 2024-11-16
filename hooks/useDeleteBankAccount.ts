import { usePrivy } from "@privy-io/expo";
import { useState } from "react";
import { deleteBankAccount } from "../lib/api/bank-accounts";

export function useDeleteBankAccount() {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteBankAccountMutation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      await deleteBankAccount({
        token,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to delete bank account")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteBankAccount: deleteBankAccountMutation,
    isLoading,
    error,
  };
}
