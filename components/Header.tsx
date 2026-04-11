import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  const isauth = true
  return (
    <header className="w-full flex justify-center bg-sidebar">
        <div className="max-w-3xl w-full flex justify-between items-center p-4">
            <div className="flex gap-2">
                <Button variant="outline" asChild>
                    <Link href="/">Главная</Link >
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/books">Книги</Link >
                </Button>
            </div>
            {!isauth ? <div className="flex items-center">
                <Button variant="link" asChild>
                    <Link href="/login">Войти</Link >
                </Button>
                /
                <Button variant="link" asChild>
                    <Link href="/register">Зарегестрироваться</Link >
                </Button>
            </div>
            :
            <div>
                <Button variant="outline" asChild>
                    <Link href='/profile'>Профиль</Link>
                </Button>
            </div>}
        </div>
    </header>
  )
}
