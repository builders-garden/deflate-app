import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import {
  getValueChart,
  ValueChartResponse,
  ONE_INCH_TIMERANGE,
} from "../lib/api/portfolio";

export function useValueChart(timerange: ONE_INCH_TIMERANGE) {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [valueChart, setValueChart] = useState<ValueChartResponse | null>(null);

  const fetchValueChart = async (
    tr: ONE_INCH_TIMERANGE = ONE_INCH_TIMERANGE["1week"]
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getValueChart({ token, timerange: tr });
      setValueChart(response);
      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch value chart")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchValueChart();
  }, [timerange]);

  return {
    refetch: fetchValueChart,
    isLoading,
    error,
    data: valueChart,
  };
}
