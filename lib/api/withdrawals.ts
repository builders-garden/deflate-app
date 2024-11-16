import ky from "ky";

export interface WithdrawalsResponse {
  data: {
    id: string;
    currency: string;
    amount: string;
    createdAt: string;
    receipt: {
      outgoingAmount: string;
    };
    status: string;
  }[];
  count: number;
}

export const getWithdrawals = async ({
  token,
}: {
  token: string;
}): Promise<WithdrawalsResponse> =>
  ky
    .get(`${process.env.EXPO_PUBLIC_BASE_API}/v1/withdrawals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<WithdrawalsResponse>();
