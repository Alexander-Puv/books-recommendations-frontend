"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span>BookRecommender</span>
        </Link>

        <Button variant="link" asChild>
          <Link href="/books">Поиск</Link>
        </Button>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">Привет, {user.username}</span>

            <Button variant="outline" asChild>
              <Link href="/profile">Профиль</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Вход</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Регистрация</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}