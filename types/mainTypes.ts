interface Book {
  id: string
  title: string

  // Автор
  authorId: string
  author: string

  // Основная информация
  genre: string
  description: string
  year: number

  // Статистика
  averageRating: number
  ratingsCount: number
  readCount: number
  reviewCount: number

  // Ссылки и медиа
  coverUrl: string
  goodreadsUrl: string
}

interface User {
  id: string
  username: string
  email: string
  password_hash?: string // Не используем на фронте, но для типизации
}

interface Genre {
  name: string
  count?: number
}

interface Favorite {
  id: number
  user_id: string
  book_id: string
}

interface Interaction {
  id: number
  review_id: string
  user_id: string
  book_id: string
  is_read: boolean
  rating: number
  review_text: string
  date_added: string
  date_updated: string
  started_at: string | null
  read_at: string | null
}

interface UserPreference {
  id: number
  user_id: string
  genre: string
  weight: number
}

interface Recommendation {
  book_id: string
  title: string
  author: string
  genre: string
  description: string
  average_rating: number
  score: number
  reason: string
}