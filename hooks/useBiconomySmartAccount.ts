import { usePrivy, useEmbeddedWallet } from "@privy-io/expo";
import { useState, useEffect } from "react";
import { base, polygon } from "viem/chains";
import { initializeBiconomySmartAccount } from "@/lib/biconomy";

export function useBiconomySmartAccount() {
  const { user } = usePrivy();
  const wallet = useEmbeddedWallet();
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeBiconomySmartAccount(wallet, base);
    initializeBiconomySmartAccount(wallet, polygon)
  }, [user, wallet]);

  return {
    smartAccount,
    loading,
    error,
  };
}
