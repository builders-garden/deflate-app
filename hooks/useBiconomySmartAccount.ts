import { usePrivy, useEmbeddedWallet } from "@privy-io/expo";
import { useState } from "react";
import { base } from "viem/chains";
import { initializeBiconomySmartAccount } from "@/lib/biconomy";

export function useBiconomySmartAccount() {
  const { user } = usePrivy();
  const wallet = useEmbeddedWallet();
  const [smartAccount, setSmartAccount] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function initializeSmartAccount() {
    console.log("INITIALIZING SMART ACCOUNT");
    const smartAccount = await initializeBiconomySmartAccount(wallet, base);
    setSmartAccount(smartAccount);
    return smartAccount;
  }

  return {
    fetchSmartAccount: initializeSmartAccount,
    smartAccount,
    loading,
    error,
  };
}
