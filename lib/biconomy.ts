import {
  createNexusClient,
  toSmartSessionsValidator,
  smartSessionCreateActions,
} from "@biconomy/sdk";
import { EmbeddedWalletState } from "@privy-io/expo";
import { Chain, http } from "viem";
import { getWalletClient } from "./wallets";
import { createPaymasterClient } from "viem/_types/account-abstraction";
import { base, polygon } from "viem/chains";
// You'll need to set these up in your environment variables
const BUNDLER_URL = (chainId: number) =>
  chainId === base.id
    ? process.env.EXPO_PUBLIC_BICONOMY_BASE_BUNDLER_URL
    : process.env.EXPO_PUBLIC_BICONOMY_POLYGON_BUNDLER_URL;

const PAYMASTER_URL = (chainId: number) =>
  chainId === base.id
    ? process.env.EXPO_PUBLIC_BICONOMY_BASE_URL
    : process.env.EXPO_PUBLIC_BICONOMY_POLYGON_PAYMASTER_URL;

export const initializeBiconomySmartAccount = async (
  wallet: EmbeddedWalletState,
  chain: Chain
) => {
  try {
    if (!wallet) return;

    const walletClient = getWalletClient(
      wallet.account?.address!,
      chain,
      wallet
    );

    const paymasterClient = createPaymasterClient({
      transport: http(PAYMASTER_URL(chain.id)),
    });

    // Create base nexus client
    const nexusClient = await createNexusClient({
      // @ts-ignore
      signer: walletClient,
      chain,
      transport: http(),
      bundlerTransport: http(BUNDLER_URL(chain.id)),
      paymaster: paymasterClient,
      paymasterContext: {
        mode: "SPONSORED",
        calculateGasLimits: true,
        expiryDuration: 300, // duration (secs) for which the generate paymasterAndData will be valid. Default duration is 300 secs.
        sponsorshipInfo: {
          webhookData: {},
          smartAccountInfo: {
            name: "BICONOMY",
            version: "2.0.0",
          },
        },
      },
    });

    // Create and install sessions module
    const sessionsModule = toSmartSessionsValidator({
      account: nexusClient.account,
      // @ts-ignore
      signer,
    });

    // Install the module
    const hash = await nexusClient.installModule({
      module: sessionsModule.moduleInitData,
    });
    await nexusClient.waitForUserOperationReceipt({ hash });

    // Extend client with session capabilities
    const nexusSessionClient = nexusClient.extend(
      smartSessionCreateActions(sessionsModule)
    );

    return nexusSessionClient;
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Failed to initialize smart account");
  }
};
