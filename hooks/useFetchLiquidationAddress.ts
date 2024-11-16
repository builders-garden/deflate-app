import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { getLiquidationAddress, LiquidationAddress } from "../lib/api/liquidation-address";

export function useFetchLiquidationAddress() {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [liquidationAddress, setLiquidationAddress] = useState<LiquidationAddress | null>(null);

  const fetchLiquidationAddress = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getLiquidationAddress({
        token,
      });

      setLiquidationAddress(response);
      return response;
    } catch (err) {
      if (err instanceof Error && err.message.includes('400')) {
        setLiquidationAddress(null);
        return null;
      }
      setError(err instanceof Error ? err : new Error("Failed to fetch liquidation address"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiquidationAddress();
  }, []);

  return {
    fetchLiquidationAddress,
    isLoading,
    error,
    liquidationAddress,
  };
}
