import { useQuery } from "@tanstack/react-query";
import { interactionsApi } from "@/lib/api";

export function useInteractions(userId?: string) {
  return useQuery<Interaction[]>({
    queryKey: ["interactions", userId],
    queryFn: async (): Promise<Interaction[]> => {
      if (!userId) {
        return [];
      }

      return await interactionsApi.getUserInteractions(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}