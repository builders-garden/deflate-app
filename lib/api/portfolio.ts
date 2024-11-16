import ky from "ky";

export enum ONE_INCH_TIMERANGE {
  "1day" = "1day",
  "1week" = "1week",
  "1month" = "1month",
  "1year" = "1year",
}

export interface ValueChartPoint {
  timestamp: number;
  value_usd: number;
}

export interface ProfitAndLoss {
  abs_profit_usd: number;
  roi: number;
}

export interface PortfolioResponse {
  profitAndLoss: ProfitAndLoss;
  valueChart: ValueChartPoint[];
  currentValue: number;
}
/**
 * @dev get profit and loss data for user on multiple chains
 * @returns {Promise<ProfitAndLossResponse>} the profit and loss value data
 */
export const getPortfolio = async ({
  token,
  timerange,
}: {
  token: string;
  timerange: ONE_INCH_TIMERANGE;
}): Promise<PortfolioResponse> =>
  ky
    .get(
      `${process.env.EXPO_PUBLIC_BASE_API}/v1/portfolio?timerange=${timerange}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .json<PortfolioResponse>();
