import { User } from "@privy-io/expo";
import ky from "ky";

export const updateUser = async ({
  token,
  data,
}: {
  token: string;
  data: {
    username: string;
  };
}) => {
  return ky
    .put(`${process.env.EXPO_PUBLIC_BASE_API}/v1/users/me`, {
      json: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<User>();
};
