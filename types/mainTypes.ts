interface Book {
  id: string
  title: string

  // Автор
  author_id: string
  author: string

  // Основная информация
  genre: string
  description: string
  year: number

  // Статистика
  average_rating: number
  ratings_count: number
  read_count: number
  review_count: number

  // Ссылки и медиа
  cover_url: string
  goodreads_url: string
}

interface User {
  id: string
  username: string
  email: string
  password_hash: string
}

interface Genre {
  name: string
  count?: number
}

interface Favorite {
  favorite_id: number;
  user_id: string;
  book: Book;
}

 interface InteractionBook {
  title: string;
  author: string;
  genre: string;
  average_rating: number;
}

interface Interaction {
  interaction_id: number;
  user_id: string;
  book_id: string;
  is_read: boolean;
  rating: number;
  review_text: string;
  book?: InteractionBook;
}

interface Preference {
  id: number
  user_id: string
  genre: string
  weight: number
}

interface Recommendation {
  id: string
  title: string
  author: string
  genre: string
  description: string
  average_rating: number
  score: number
  reason: string
}