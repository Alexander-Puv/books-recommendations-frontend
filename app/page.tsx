"use client";

import { HorizontalBookList } from "@/components/ui/horizontal-book-list";
import { useRecommendations } from "@/hooks/useRecommendations";
import { booksApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useRecommendations(user?.id);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [topBooks, setTopBooks] = useState<Book[]>([]);

  useEffect(() => {
    async function load() {
      if (!data?.recommendations) return;
      
      const recBooksData = await Promise.all(
        data.recommendations.map((r) => booksApi.getBookById(r.id))
      );

      const topBooksData = await (await booksApi.getTopBooks()).books
      
      setRecommendations(recBooksData);
      setTopBooks(topBooksData)
    }

    load();
  }, [data]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Войдите в аккаунт
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Загрузка рекомендаций...
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full xl:max-w-4/5 flex-col items-center justify-between gap-12 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-3xl">Tranding</h2>
          <HorizontalBookList books={topBooks} variant="featured" />
        </div>
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-3xl">Recommendations</h2>
          <HorizontalBookList books={recommendations} variant="minimal" />
        </div>
      </main>
    </div>
  );
}