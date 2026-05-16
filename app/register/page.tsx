"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();

  const { register, isLoading, error } = useAuthStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const success = await register({
      username,
      email,
      password,
    });

    if (success) {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-20 flex flex-col gap-4 rounded-xl border p-6 shadow"
    >
      <h1 className="text-2xl font-bold">Регистрация</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded border p-3"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded border p-3"
        required
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded border p-3"
        required
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-black px-4 py-3 text-white disabled:opacity-50"
      >
        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}