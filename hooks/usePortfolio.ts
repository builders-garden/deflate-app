import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { getPortfolio, ONE_INCH_TIMERANGE, PortfolioResponse } from "../lib/api/portfolio";

export function usePortfolio(timerange: ONE_INCH_TIMERANGE) {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
  useState<PortfolioResponse | null>(null);

  const fetchPortfolio = async (tr: ONE_INCH_TIMERANGE = timerange) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getPortfolio({ token, timerange: tr });
      setPortfolio(response);
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
    fetchPortfolio();
  }, [timerange]);

  return {
    refetch: fetchPortfolio,
    isLoading,
    error,
    data: portfolio,
  };
}
