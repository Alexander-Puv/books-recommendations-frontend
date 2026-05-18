"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { BookCard } from "@/components/ui/bookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { booksApi } from "@/lib/api";

export default function BooksPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // поиск через API
  async function handleSearch() {
    const q = query.trim();

    if (!q) {
      setBooks([]);
      return;
    }

    setLoading(true);

    try {
      const res = await booksApi.searchBooks(q); 
      setBooks(res.results);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto space-y-6 px-4 py-6">
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>

        <Button onClick={handleSearch} type="button">
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
            Найдено: {books.length}
          </span>
        </div>

        {loading ? (
          <div className="py-10 text-center text-muted-foreground">
            Поиск...
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {books.map((book) => (
              <BookCard key={book.id} {...book} variant="default" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-8 text-center">
            <p className="text-lg font-medium">Ничего не найдено</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Попробуйте изменить запрос.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}