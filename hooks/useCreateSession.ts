import { usePrivy } from "@privy-io/expo";
import { useState } from "react";
import { createSession } from "../lib/api/sessions";

export function useCreateSession() {
  const { user, getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createSessionMutation = async (compressedSessionData: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await getAccessToken();
      if (!token) throw new Error("No authentication token found");

      const response = await createSession({
        token,
        compressedSessionData,
      });

      return response;
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err : new Error("Failed to create session")
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSession: createSessionMutation,
    isLoading,
    error,
  };
}
