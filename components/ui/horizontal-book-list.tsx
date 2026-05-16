"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCard } from "./bookCard"
import { cn } from "@/lib/utils"

interface HorizontalBookListProps {
  books: Book[]
  variant?: "default" | "featured" | "minimal"
}

export const HorizontalBookList = ({
  books,
  variant = "default",
}: HorizontalBookListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const scrollByAmount = (direction: "left" | "right") => {
    const container = containerRef.current
    if (!container) return

    const amount = container.clientWidth * 0.8

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return

    if (e.button !== 0) return

    if (e.ctrlKey || e.shiftKey || e.altKey) return

    isDraggingRef.current = true
    startXRef.current = e.pageX - container.offsetLeft
    scrollLeftRef.current = container.scrollLeft

    container.style.cursor = "grabbing"
    container.style.userSelect = "none"
    
    e.preventDefault()
  }

  const stopDragging = () => {
    const container = containerRef.current
    if (!container) return

    isDraggingRef.current = false
    container.style.cursor = "grab"
    container.style.userSelect = ""
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const container = containerRef.current
    if (!container) return

    e.preventDefault()
    e.stopPropagation()

    const x = e.pageX - container.offsetLeft
    const walk = (x - startXRef.current) * 1.5

    container.scrollLeft = scrollLeftRef.current - walk
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className="relative w-full">
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 -translate-x-5 cursor-pointer
          border border-card
          transition-all duration-200 hover:border-white"
        onClick={() => scrollByAmount("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div
        ref={containerRef}
        className="
          flex gap-3 px-12 pb-2
          overflow-x-auto overflow-y-hidden
          snap-x snap-mandatory scroll-smooth
          overscroll-x-contain
          no-scrollbar
          cursor-grab select-none
        "
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onClick={handleClick}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className={cn(
              "shrink-0 snap-start",
              variant === "default" && "w-45",     // 180px
              variant === "minimal" && "w-35",     // 140px
              variant === "featured" && "w-105"    // 420px
            )}
          >
            <BookCard
              {...book}
              variant={variant}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 translate-x-5 cursor-pointer
          border border-card
          transition-all duration-200 hover:border-white"
        onClick={() => scrollByAmount("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}