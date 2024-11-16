import { usePrivy } from "@privy-io/expo";
import { useState } from "react";
import { getNewKYCLink, KycLinkResponse } from "../lib/api/kyc";

export function useCreateKYC() {
  const { user, getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [kycLink, setKycLink] = useState<KycLinkResponse | null>(null);

  const createKYC = async ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await getNewKYCLink({
        token,
        data: { fullName, address, city, postalCode, country },
      });

      setKycLink(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create KYC"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createKYC,
    isLoading,
    error,
    kycLink,
  };
}
