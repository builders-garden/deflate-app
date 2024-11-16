import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import {
  getProfitAndLoss,
  ProfitAndLossResponse,
  ONE_INCH_TIMERANGE,
} from "../lib/api/portfolio";

export function useProfitAndLoss(timerange: ONE_INCH_TIMERANGE) {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [profitAndLoss, setProfitAndLoss] =
    useState<ProfitAndLossResponse | null>(null);

  const fetchProfitAndLoss = async (tr: ONE_INCH_TIMERANGE = timerange) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getProfitAndLoss({ token, timerange: tr });
      setProfitAndLoss(response);
      return response;
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch profit and loss")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfitAndLoss();
  }, [timerange]);

  return {
    refetch: fetchProfitAndLoss,
    isLoading,
    error,
    data: profitAndLoss,
  };
}
