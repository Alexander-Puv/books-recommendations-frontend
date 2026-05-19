import { useQuery } from "@tanstack/react-query";
import { favoritesApi, preferencesApi } from "@/lib/api";

export function useProfileData(userId?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;

      const [favorites, preferences] = await Promise.all([
        favoritesApi.getUserFavorites(userId),
        preferencesApi.getUserPreferences(userId),
      ]);

      return {
        favorites,
        preferences,
      };
    },
  });
}