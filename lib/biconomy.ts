import {
  createNexusClient,
  toSmartSessionsValidator,
  smartSessionCreateActions,
  createBicoPaymasterClient,
} from "@biconomy/sdk";
import { getAction } from "viem/utils";
import { EmbeddedWalletState } from "@privy-io/expo";
import { Chain, encodeFunctionData, getAddress, http } from "viem";
import { getWalletClient } from "./wallets";
import { base, polygon } from "viem/chains";
import { sendUserOperation } from "viem/account-abstraction";
// You'll need to set these up in your environment variables
const BUNDLER_URL = (chainId: number) =>
  chainId === base.id
    ? process.env.EXPO_PUBLIC_BICONOMY_BASE_BUNDLER_URL
    : process.env.EXPO_PUBLIC_BICONOMY_POLYGON_BUNDLER_URL;

const PAYMASTER_URL = (chainId: number) =>
  chainId === base.id
    ? process.env.EXPO_PUBLIC_BICONOMY_BASE_PAYMASTER_URL
    : process.env.EXPO_PUBLIC_BICONOMY_POLYGON_PAYMASTER_URL;

export const initializeBiconomySmartAccount = async (
  wallet: EmbeddedWalletState,
  chain: Chain
) => {
  try {
    if (!wallet || !wallet.account?.address) return;

    const walletClient = getWalletClient(
      wallet.account?.address!,
      chain,
      wallet
    );

    const paymasterClient = createBicoPaymasterClient({
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
    });

    const sessionsModule = toSmartSessionsValidator({
      account: nexusClient.account,
      // @ts-ignore
      signer: {
        ...walletClient,
        address: wallet.account?.address as `0x${string}`,
      } as any,
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
