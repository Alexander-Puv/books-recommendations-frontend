export const API_URL = "https://book-recommendation-backend-z4hm.onrender.com";

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
}

export interface CreateUserDto {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users/`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function createUser(data: CreateUserDto): Promise<User> {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create user error:", errorText);
    throw new Error(errorText || "Failed to create user");
  }

  const result: CreateUserResponse = await response.json();

  return result.user;
}