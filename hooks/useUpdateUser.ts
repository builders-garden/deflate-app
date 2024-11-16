import { useState } from "react";
import { usePrivy } from "@privy-io/expo";
import { updateUser } from "@/lib/api/users";

export const useUpdateUser = () => {
  const { user, getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateUserMutation = async (data: {
    username?: string;
    mode?: string;
    answer1?: string;
    answer2?: string;
    answer3?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const updatedUser = await updateUser({
        token,
        data,
      });
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update user"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser: updateUserMutation,
    isLoading,
    error,
  };
};
