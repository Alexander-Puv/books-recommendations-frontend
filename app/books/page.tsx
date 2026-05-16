"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import tempBooks from "@/temp/books"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BookCard } from "@/components/ui/bookCard"

export default function BooksPage() {
  const [query, setQuery] = useState("")

  // Пока используем локальные моковые данные.
  // Когда будет готов бэкенд, этот массив заменится на данные из API.
  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return tempBooks
    }

    return tempBooks.filter((book) => {
      const title = book.title.toLowerCase()
      const author = book.author.toLowerCase()
      const genre = book.genre.toLowerCase()
      const year = String(book.year)

      return (
        title.includes(normalizedQuery) ||
        author.includes(normalizedQuery) ||
        genre.includes(normalizedQuery) ||
        year.includes(normalizedQuery)
      )
    })
  }, [query])

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      {/* Заголовок */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Поиск книг</h1>
        <p className="text-muted-foreground">
          Найдите книги по названию, автору, жанру или году издания.
        </p>
      </section>

      {/* Поиск */}
      <section className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название книги, автор, жанр или год..."
            className="pl-9"
          />
        </div>

        <Button type="button">
          Найти
        </Button>
      </section>

      {/* Результаты */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Результаты поиска
          </h2>

          <span className="text-sm text-muted-foreground">
            Найдено: {filteredBooks.length}
          </span>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                {...book}
                coverUrl={book.coverUrl}
                variant="default"
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center">
            <p className="text-lg font-medium">
              Ничего не найдено
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Попробуйте изменить поисковый запрос.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}