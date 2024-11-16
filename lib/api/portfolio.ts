import ky from "ky";

export enum ONE_INCH_TIMERANGE {
  "1d" = "1d",
  "1week" = "1week",
  "1month" = "1month",
  "1year" = "1year",
}

export interface CurrentValueResponse {
  data: number;
}

export interface ValueChartResponse {
  data: {
    timestamp: number;
    value_usd: number;
  }[];
}

export interface ProfitAndLossResponse {
  data: {
    abs_profit_usd: number;
    roi: number;
  };
}

/**
 * @dev get current balance for user on multiple chains
 * @returns {Promise<CurrentValueResponse>} the current value data
 */
export const getCurrentValue = async ({
  token,
}: {
  token: string;
}): Promise<CurrentValueResponse> =>
  ky
    .get(`${process.env.EXPO_PUBLIC_BASE_API}/v1/portfolio/current-value`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<CurrentValueResponse>();

/**
 * @dev get value chart data for user on multiple chains
 * @returns {Promise<ValueChartResponse>} the current value data
 */
export const getValueChart = async ({
  token,
  timerange,
}: {
  token: string;
  timerange: ONE_INCH_TIMERANGE;
}): Promise<ValueChartResponse> =>
  ky
    .get(
      `${process.env.EXPO_PUBLIC_BASE_API}/v1/portfolio/value-chart?timerange=${timerange}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .json<ValueChartResponse>();

/**
 * @dev get profit and loss data for user on multiple chains
 * @returns {Promise<ProfitAndLossResponse>} the profit and loss value data
 */
export const getProfitAndLoss = async ({
  token,
  timerange,
}: {
  token: string;
  timerange: ONE_INCH_TIMERANGE;
}): Promise<ProfitAndLossResponse> =>
  ky
    .get(
      `${process.env.EXPO_PUBLIC_BASE_API}/v1/portfolio/profit-and-loss?timerange=${timerange}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .json<ProfitAndLossResponse>();
