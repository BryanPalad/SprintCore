import { api } from "@/lib/api";
import type { SignInFormData, RegisterPayload as SignUpFormData } from "../validation";

export type OAuthProvider = "google" | "github";

export function getOAuthLoginUrl(provider: OAuthProvider) {
  const baseUrl = String(import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

  return `${baseUrl}/auth/${provider}`;
}

export async function loginUser(data: SignInFormData) {
  const response = await api.post("auth/login", data);

  return response.data;
}

export async function registerUser(data: SignUpFormData) {
  const response = await api.post("auth/register", data);

  return response.data;
}

export async function getCurrentUser() {
    const response = await api.get("auth/me");

    return response.data;
}

export async function logoutUser() {
    await api.post("auth/logout");
}