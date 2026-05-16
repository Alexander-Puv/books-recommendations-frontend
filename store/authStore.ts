import { create } from "zustand";
import { createUser, getUsers, User } from "@/lib/api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  register: (data: RegisterData) => Promise<boolean>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => void;
  restoreUser: () => void;
}

function generateUserId() {
  return `u${Date.now()}`;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  register: async ({ username, email, password }) => {
    try {
      set({ isLoading: true, error: null });

      const users = await getUsers();

      const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        set({
          error: "Пользователь с таким email уже существует",
          isLoading: false,
        });
        return false;
      }

      const newUser = await createUser({
        id: generateUserId(),
        username,
        email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(newUser));

      set({
        user: newUser,
        isLoading: false, 
      });

      return true;
    } catch {
      set({
        error: "Ошибка регистрации",
        isLoading: false,
      });
      return false;
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ isLoading: true, error: null });

      const users = await getUsers();

      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password_hash === password
      );

      if (!user) {
        set({
          error: "Неверный email или пароль",
          isLoading: false,
        });
        return false;
      }

      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        isLoading: false,
      });

      return true;
    } catch {
      set({
        error: "Ошибка входа",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  restoreUser: () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      set({
        user: JSON.parse(storedUser),
      });
    }
  },
}));