import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { booksApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  MessageSquare,
  Star,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await booksApi.getBookById(id);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Назад */}
      <Link href="/books">
        <Button variant="ghost" className="mb-6 pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to books
        </Button>
      </Link>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Обложка */}
        <div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {book.cover_url ? (
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={book.cover_url}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="min-h-[60vh] flex flex-col items-center justify-center bg-linear-to-br from-muted to-muted/60 p-4 text-center">
                  <BookOpen
                    className={cn(
                      "mb-3 text-muted-foreground size-12",
                    )}
                  />
              
                  <p
                    className={cn(
                      "font-semibold text-foreground line-clamp-2 text-sm",
                    )}
                  >
                    {book.title}
                  </p>
              
                  <p
                    className={cn(
                      "mt-1 text-muted-foreground line-clamp-1 text-xs",
                    )}
                  >
                    {book.author}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Информация */}
        <div className="space-y-6">
          {/* Заголовок */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{book.genre}</Badge>
            </div>

            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              {book.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              by {book.author}
            </p>
          </div>

          {/* Рейтинг */}
          <Card>
            <CardContent className="flex flex-wrap items-center gap-6 p-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {book.average_rating.toFixed(1)}
                </span>
                <div>
                  <RatingStars rating={book.average_rating} />
                  <p className="text-sm text-muted-foreground">
                    Average rating
                  </p>
                </div>
              </div>

              <div className="h-10 w-px bg-border" />

              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-semibold">
                    {book.ratings_count.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Ratings</p>
                </div>

                <div>
                  <p className="font-semibold">
                    {book.review_count.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Reviews</p>
                </div>

                <div>
                  <p className="font-semibold">
                    {book.read_count.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Reads</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Основные сведения */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Book Details</h2>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Publication Year
                  </p>
                  <p className="font-medium">{book.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Genre</p>
                  <p className="font-medium">{book.genre}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Ratings</p>
                  <p className="font-medium">{book.ratings_count}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                  <p className="font-medium">{book.review_count}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Описание */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Description</h2>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                {book.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}