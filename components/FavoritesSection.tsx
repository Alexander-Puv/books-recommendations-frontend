"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FavoritesSection({ favorites }: { favorites: Favorite[] }) {
  const [open, setOpen] = useState(false);

  const visibleFavorites = open
    ? favorites
    : favorites.slice(0, 3);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Избранные</h2>

        {favorites.length > 3 && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {open ? "Скрыть" : "Показать все"}
            {open ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      {favorites.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFavorites.map((fav) => (
            <Link
              href={"/books/" + fav.book.id}
              className="rounded-lg border p-3 transition hover:bg-muted/40"
              key={fav.favorite_id}
            >
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                {fav.book.title}
              </h3>

              <p className="line-clamp-1 text-xs text-muted-foreground">
                {fav.book.author}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No favorites yet</p>
      )}
    </section>
  );
}