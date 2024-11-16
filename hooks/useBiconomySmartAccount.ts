// import { usePrivy, useEmbeddedWallet } from "@privy-io/expo";
// import { createSmartAccountClient, LightSigner } from "@biconomy/account";
// import { useState, useEffect } from "react";

// // You'll need to set these up in your environment variables
// const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_URL || "";
// const PAYMASTER_API_KEY = process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
// const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
// const TARGET_CHAIN_ID = 80001; // Mumbai testnet - adjust as needed

// export function useBiconomySmartAccount() {
//   const { user } = usePrivy();
//   const wallet = useEmbeddedWallet();
//   const [smartAccount, setSmartAccount] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const initializeSmartAccount = async () => {
//       try {
//         if (!user) return;

//         if (!wallet) {
//           throw new Error("No embedded wallet found");
//         }
//         const provider = await wallet.getProvider();
//         // Switch to target chain
//         await provider.request({
//           method: "wallet_switchEthereumChain",
//           // Replace '0x5' with the chainId of your target network
//           params: [{ chainId: "0x5" }],
//         });

//         const signer = provider.getSigner(wallet.account?.address);

//         // Create smart account instance
//         const nexusClient = await createNexusClient({
//           signer: account,
//           chain: baseSepolia,
//           transport: http(),
//           bundlerTransport: http(bundlerUrl),
//         });

//         // Enable specific module if needed
//         const moduleAddress = "YOUR_MODULE_ADDRESS";
//         const isEnabled = await biconomySmartAccount.isModuleEnabled(
//           moduleAddress
//         );

//         if (!isEnabled) {
//           const enableModuleTx = await biconomySmartAccount.getEnableModuleData(
//             moduleAddress
//           );
//           await biconomySmartAccount.sendTransaction(enableModuleTx);
//         }

//         setSmartAccount(biconomySmartAccount);
//       } catch (err) {
//         setError(
//           err instanceof Error
//             ? err
//             : new Error("Failed to initialize smart account")
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeSmartAccount();
//   }, [user, wallet]);

//   return {
//     smartAccount,
//     loading,
//     error,
//   };
// }
