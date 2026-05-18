import { useQuery } from "@tanstack/react-query";
import { recommendationsApi } from "@/lib/api";

export function useRecommendations(userId?: string) {
  return useQuery({
    queryKey: ["recommendations", userId],
    queryFn: () => recommendationsApi.getRecommendations(userId!),
    enabled: !!userId, // не делать запрос пока нет userId
  });
}