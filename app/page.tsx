import { HorizontalBookList } from "@/components/ui/horizontal-book-list";
import tempBooks from "@/temp/books";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full xl:max-w-4/5
        flex-col items-center justify-between gap-12 py-32 px-16
      bg-white dark:bg-black sm:items-start">
        <HorizontalBookList
          books={tempBooks}
          variant="featured"
        />
        <HorizontalBookList
          books={tempBooks}
          variant="default"
        />
        <HorizontalBookList
          books={tempBooks}
          variant="minimal"
        />
      </main>
    </div>
  );
}
