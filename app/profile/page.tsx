"use client";

import {
  BookOpen,
  CheckCircle2,
  Mail,
  MessageSquare,
  Star,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { useAuthStore } from "@/store/authStore";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInteractions } from "@/hooks/useInteractions";
import { Button } from "@/components/ui/button";

function getInitials(username: string) {
  return username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const { data: interactions = [], isLoading } = useInteractions(user?.id);

  const stats = useMemo(() => {
    const readBooks = interactions.filter((i) => i.is_read).length;
    const reviewedBooks = interactions.filter(
      (i) => i.review_text?.trim()
    ).length;
    const ratedBooks = interactions.filter((i) => i.rating > 0).length;

    const averageRating =
      ratedBooks > 0
        ? (
            interactions
              .filter((i) => i.rating > 0)
              .reduce((sum, i) => sum + i.rating, 0) / ratedBooks
          ).toFixed(1)
        : "0.0";

    return {
      readBooks,
      reviewedBooks,
      ratedBooks,
      averageRating,
    };
  }, [interactions]);

  const reviewedInteractions = useMemo(() => {
    return interactions.filter((i) => i.review_text?.trim());
  }, [interactions]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please sign in
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* Header */}
      <section>
        <Card>
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-semibold">
                {getInitials(user.username)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <Badge variant="secondary">Reader</Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>

              <Button variant="destructive" onClick={logout} className="mt-4 cursor-pointer">
                Выйти
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.readBooks}</p>
              <p className="text-sm text-muted-foreground">Books Read</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Star className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.averageRating}</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.reviewedBooks}</p>
              <p className="text-sm text-muted-foreground">Reviews Written</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{stats.ratedBooks}</p>
              <p className="text-sm text-muted-foreground">Books Rated</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Reviewed Books */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">My Reviews</h2>
          <p className="text-muted-foreground">
            Books you have reviewed and rated.
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading reviews...
          </div>
        ) : reviewedInteractions.length > 0 ? (
          <div className="space-y-6">
            {reviewedInteractions.map((interaction) => (
              <Card key={interaction.interaction_id}>
                <CardContent className="space-y-4 p-6">
                  {interaction.book && (
                    <div className="max-w-xs">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                        {interaction.book.title}
                      </h3>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {interaction.book.author}
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {interaction.rating}/5
                      </span>
                    </div>

                    <p className="leading-7 text-muted-foreground">
                      {interaction.review_text}
                    </p>
                  </div>

                  <Link
                    href={`/books/${interaction.book_id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View book →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold">No reviews yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start reading and leave your first review.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}