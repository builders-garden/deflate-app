import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { getBankAccount, BankAccount } from "../lib/api/bank-accounts";

export function useFetchBankAccount() {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);

  const fetchBankAccountQuery = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getBankAccount({
        token,
      });

      setBankAccount(response);
      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch bank account")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBankAccountQuery();
  }, []);

  return {
    refetch: fetchBankAccountQuery,
    isLoading,
    error,
    bankAccount,
  };
}
