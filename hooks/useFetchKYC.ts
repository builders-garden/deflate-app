import { usePrivy } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { getKYCLink, KycLinkResponse } from "../lib/api/kyc";

export function useFetchKYC() {
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [kycLink, setKycLink] = useState<KycLinkResponse | null>(null);

  const fetchKYC = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getKYCLink({
        token,
      });

      setKycLink(response);
      return response;
    } catch (err) {
      if (err instanceof Error && err.message.includes('400')) {
        setKycLink(null);
        return null;
      }
      setError(err instanceof Error ? err : new Error("Failed to fetch KYC"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKYC();
  }, []);

  return {
    fetchKYC,
    isLoading,
    error,
    kycLink,
  };
}
