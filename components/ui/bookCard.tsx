import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BookOpen } from "lucide-react"

type BookCardVariant =
  | "default"
  | "featured"
  | "minimal"

interface BookCardProps extends Book {
  variant?: BookCardVariant
  className?: string
}

export const BookCard = ({
  id,
  title,
  author,
  cover_url,
  average_rating,
  year,
  genre,
  variant = "default",
  className,
}: BookCardProps) => {
  return (
    <Link href={`/books/${id}`} className="block">
      <Card className={cn(
        "overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col h-full",
        className
      )}>
        {/* COVER */}
        <div
          className={cn(
            "relative aspect-2/3 bg-muted",
            variant === "featured" && "aspect-3/2"
          )}
        >
          {cover_url ? (
            <Image
              src={cover_url}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <CoverPlaceholder
              title={title}
              author={author}
              variant={variant}
            />
          )}

          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <Star className="size-3 fill-yellow-400 stroke-none" />
            {average_rating.toFixed(1)}
          </div>
        </div>

        {/* CONTENT */}
        {variant !== "minimal" && (
          <CardContent className="p-3 flex flex-col justify-between flex-1">
            <div className="space-y-1">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                {title}
              </h3>
              <p className="line-clamp-1 text-xs text-muted-foreground">
                {author}
              </p>
            </div>
            
            {variant === "default" && (
              <div className="mt-2">
                <Badge variant="secondary" className="max-w-full text-[10px]">
                  <span className="truncate block max-w-25">{genre}</span>
                </Badge>
              </div>
            )}

            {variant === "featured" && (
              <div className="mt-3 space-y-2">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {genre}
                </p>

                <p className="text-xs text-muted-foreground">
                  {year}
                </p>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

interface CoverPlaceholderProps {
  variant: BookCardVariant
  title: string
  author: string
}

const CoverPlaceholder = ({
  variant,
  title,
  author,
}: CoverPlaceholderProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-muted to-muted/60 p-4 text-center">
      <BookOpen
        className={cn(
          "mb-3 text-muted-foreground",
          variant === "featured" ? "size-12" : "size-8"
        )}
      />

      <p
        className={cn(
          "font-semibold text-foreground line-clamp-2",
          variant === "featured" ? "text-sm" : "text-xs"
        )}
      >
        {title}
      </p>

      <p
        className={cn(
          "mt-1 text-muted-foreground line-clamp-1",
          variant === "featured" ? "text-xs" : "text-[10px]"
        )}
      >
        {author}
      </p>
    </div>
  )
}