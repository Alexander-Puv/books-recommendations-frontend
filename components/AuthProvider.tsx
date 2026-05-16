"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const restoreUser = useAuthStore((state) => state.restoreUser);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  return <>{children}</>;
}