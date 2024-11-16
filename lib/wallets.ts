import { Chain, EmbeddedWalletState } from "@privy-io/expo";
import { createWalletClient, custom, WalletClient } from "viem";
import { providers } from "ethers";

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain!.id,
    name: chain!.name,
    ensAddress: chain!.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account!.address);
  return signer;
}

export function walletClientToProvider(walletClient: WalletClient) {
  const { chain, transport } = walletClient;
  const network = {
    chainId: chain!.id,
    name: chain!.name,
    ensAddress: chain!.contracts?.ensRegistry?.address,
  };
  return new providers.Web3Provider(transport, network);
}

export const getWalletClient = (
  ownerAddress: string,
  chain: Chain,
  wallet: EmbeddedWalletState
) => {
  return createWalletClient({
    account: ownerAddress as `0x${string}`,
    chain,
    transport: custom({
      async request({ method, params }) {
        return (await wallet.getProvider!()).request({ method, params });
      },
    }),
  });
};
