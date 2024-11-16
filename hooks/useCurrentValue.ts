import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { getCurrentValue, CurrentValueResponse } from "../lib/api/portfolio";

export function useCurrentValue() {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentValue, setCurrentValue] = useState<CurrentValueResponse | null>(
    null
  );

  const fetchCurrentValue = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getCurrentValue({ token });
      setCurrentValue(response);
      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch current value")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentValue();
  }, []);

  return {
    refetch: fetchCurrentValue,
    isLoading,
    error,
    data: currentValue,
  };
}
