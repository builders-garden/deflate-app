import { deposit } from "@/lib/api/deposit";
import { usePrivy } from "@privy-io/expo";
import { useState } from "react";

export function useDeposit() {
  const { user, getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const depositMutation = async ({ amount }: { amount: number }) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      await deposit({
        token,
        amount,
        userAddress: user!.custom_metadata!.smartAccountAddress!.toString(),
        strategy: user?.custom_metadata?.mode === "safe" ? 1 : 2,
        userRiskProfile:
          user?.custom_metadata?.mode === "advanced"
            ? [
                `What's your main investing goal? ${user?.custom_metadata?.answer1}`,
                `What would you do if your investment drops 20%? ${user?.custom_metadata?.answer2}`,
                `How long will you invest? ${user?.custom_metadata?.answer3}`,
              ]
            : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to deposit"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deposit: depositMutation,
    isLoading,
    error,
  };
}
