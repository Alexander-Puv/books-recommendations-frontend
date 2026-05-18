// src/lib/api.ts

export const API_URL = "https://book-recommendation-backend-z4hm.onrender.com";

/* =========================
   COMMON
========================= */

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}):`, errorText);
    throw new Error(errorText || "API request failed");
  }

  return response.json();
}

/* =========================
   BOOKS
========================= */

export interface TopBooks {
  message: string
  count: number
  books: Book[]
}

export interface SearchBooks {
  query: string
  count: number
  results: Book[]
}

export interface BooksStats {
  total_books: number;
  total_genres: number;
  total_authors: number;
}

export const booksApi = {
  getBooks: () => fetchApi<Book[]>("/books/"),

  searchBooks: (query: string) =>
    fetchApi<SearchBooks>(`/books/search?q=${encodeURIComponent(query)}`),

  getTopBooks: () => fetchApi<TopBooks>("/books/top"),

  getGenres: () => fetchApi<string[]>("/books/genres/list"),

  getBooksByGenre: (genre: string) =>
    fetchApi<Book[]>(`/books/genre/${encodeURIComponent(genre)}`),

  getBooksStats: () => fetchApi<BooksStats>("/books/stats/summary"),

  getBookById: (bookId: string) => fetchApi<Book>(`/books/${bookId}`),
};

/* =========================
   USERS
========================= */

export interface CreateUserDto {
  id: string;
  username: string;
  email: string;
  password: string;
  password_hash?: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  password_hash?: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export const usersApi = {
  getUsers: () => fetchApi<User[]>("/users/"),

  getUserById: (userId: string) => fetchApi<User>(`/users/${userId}`),

  createUser: async (data: CreateUserDto): Promise<User> => {
    const result = await fetchApi<CreateUserResponse>("/users/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return result.user;
  },

  updateUser: (userId: string, data: UpdateUserDto) =>
    fetchApi<User>(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteUser: (userId: string) =>
    fetchApi<{ message: string }>(`/users/${userId}`, {
      method: "DELETE",
    }),
};

/* =========================
   FAVORITES
========================= */

export interface UpdateFavoriteDto {
  notes?: string;
  priority?: number;
}

export const favoritesApi = {
  getUserFavorites: (userId: string) =>
    fetchApi<Favorite[]>(`/favorites/${userId}`),

  addFavorite: (userId: string, bookId: string) =>
    fetchApi<{ message: string }>(`/favorites/${userId}/${bookId}`, {
      method: "POST",
    }),

  deleteFavorite: (userId: string, bookId: string) =>
    fetchApi<{ message: string }>(`/favorites/${userId}/${bookId}`, {
      method: "DELETE",
    }),

  updateFavorite: (favoriteId: number, data: UpdateFavoriteDto) =>
    fetchApi<Favorite>(`/favorites/${favoriteId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

/* =========================
   PREFERENCES
========================= */

export interface CreatePreferenceDto {
  genre: string;
  weight: number;
}

export interface UpdatePreferenceDto {
  genre?: string;
  weight?: number;
}

export const preferencesApi = {
  getUserPreferences: (userId: string) =>
    fetchApi<Preference[]>(`/preferences/${userId}`),

  addUserPreference: (userId: string, data: CreatePreferenceDto) =>
    fetchApi<Preference>(`/preferences/${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateUserPreference: (
    preferenceId: number,
    data: UpdatePreferenceDto
  ) =>
    fetchApi<Preference>(`/preferences/${preferenceId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteUserPreference: (preferenceId: number) =>
    fetchApi<{ message: string }>(`/preferences/${preferenceId}`, {
      method: "DELETE",
    }),
};

/* =========================
   INTERACTIONS
========================= */

export interface CreateInteractionDto {
  is_read?: boolean;
  rating?: number;
  review_text?: string;
}

export interface UpdateInteractionDto {
  is_read?: boolean;
  rating?: number;
  review_text?: string;
}

export const interactionsApi = {
  getUserInteractions: (userId: string) =>
    fetchApi<Interaction[]>(`/interactions/${userId}`),

  addInteraction: (
    userId: string,
    bookId: string,
    data?: CreateInteractionDto
  ) =>
    fetchApi<Interaction>(`/interactions/${userId}/${bookId}`, {
      method: "POST",
      body: JSON.stringify(data || {}),
    }),

  updateInteraction: (
    interactionId: number,
    data: UpdateInteractionDto
  ) =>
    fetchApi<Interaction>(`/interactions/${interactionId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteInteraction: (interactionId: number) =>
    fetchApi<{ message: string }>(`/interactions/${interactionId}`, {
      method: "DELETE",
    }),
};

/* =========================
   RECOMMENDATIONS
========================= */

export interface RecommendationsResponse {
  user_id: string;
  recommendation_type: string;
  preferred_genres: Record<string, number>;
  recommendations: Recommendation[];
}

export const recommendationsApi = {
  getRecommendations: (userId: string) =>
    fetchApi<RecommendationsResponse>(`/recommendations/${userId}`),
};