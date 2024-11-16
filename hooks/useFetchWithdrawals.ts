import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { getWithdrawals, WithdrawalsResponse } from "../lib/api/withdrawals";

export function useFetchWithdrawals() {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [withdrawals, setWithdrawals] = useState<WithdrawalsResponse | null>(null);

  const fetchWithdrawals = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getWithdrawals({
        token,
      });

      setWithdrawals(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch withdrawals"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return {
    fetchWithdrawals,
    isLoading,
    error,
    withdrawals,
  };
}
