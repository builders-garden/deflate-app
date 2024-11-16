import ky from "ky";
import { LiquidationAddress } from "./liquidation-address";

export async function createSession({
  compressedSessionData,
  token,
}: {
  compressedSessionData: string;
  token: string;
}) {
  return ky
    .post(`${process.env.EXPO_PUBLIC_BASE_API}/v1/sessions`, {
      json: {
        compressedSessionData,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<LiquidationAddress>();
}
