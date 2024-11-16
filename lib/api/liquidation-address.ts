import ky from "ky";

export enum FiatPaymentRail {
  ACH = "ach",
  ACH_PUSH = "ach_push",
  ACH_SAME_DAY = "ach_same_day",
  WIRE = "wire",
  SEPA = "sepa",
  SWIFT = "swift",
}

export enum ChainPaymentRail {
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
  BASE = "base",
  OPTIMISM = "optimism",
  SOLANA = "solana",
  STELLAR = "stellar",
  ARBITRUM = "arbitrum",
  AVALANCHE = "avalance_c_chain",
}

export enum Stablecoin {
  USDC = "usdc",
  EURC = "eurc",
  USDT = "usdt",
  DAI = "dai",
}

export enum FiatCurrency {
  USD = "usd",
  EUR = "eur",
}

export interface LiquidationAddress {
  id: string;
  chain: ChainPaymentRail;
  currency: Stablecoin;
  address: string;
  externalAccountId?: string;
  prefundedAccountId?: string;
  destinationWireMessage?: string;
  destinationSepaReference?: string;
  destinationSwiftReference?: string;
  destinationAchReference?: string;
  destinationPaymentRail?: FiatPaymentRail;
  destinationAddress?: string;
  destinationCurrency: FiatCurrency;
  destinationBlockchainMemo?: string;
  customDeveloperFeePercent?: string;
  state?: "active" | "deactivated";
  createdAt: Date;
  updatedAt: Date;
}

export const getLiquidationAddress = async ({
  token,
}: {
  token: string;
}): Promise<LiquidationAddress> =>
  ky
    .get(`${process.env.EXPO_PUBLIC_BASE_API}/v1/liquidation-address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<LiquidationAddress>();
