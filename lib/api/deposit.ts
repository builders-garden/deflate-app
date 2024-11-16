import ky from "ky";

export const deposit = async ({
  token,
  amount,
  userAddress,
  strategy,
  userRiskProfile,
}: {
  token: string;
  amount: number;
  userAddress: string;
  strategy: number;
  userRiskProfile: string[];
}): Promise<any> =>
  ky
    .post(`${process.env.EXPO_PUBLIC_BASE_API}/v1/deposits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        amount,
        userAddress,
        strategy,
        userRiskProfile,
        fake: true,
      },
    })
    .json<any>();
