import { apiBaseUrl } from "./api-client";

const ADMIN_KEY_STORAGE_KEY = "ibibanza-admin-key";
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getAdminKey(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_KEY_STORAGE_KEY);
}

export function setAdminKey(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_KEY_STORAGE_KEY, key);
  notifyListeners();
}

export function clearAdminKey(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_KEY_STORAGE_KEY);
  notifyListeners();
}

/** Subscribe to admin key changes (own-tab writes and cross-tab "storage" events). For use with useSyncExternalStore. */
export function subscribeAdminKey(callback: () => void): () => void {
  listeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", callback);
    }
  };
}

export async function adminFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const key = getAdminKey();
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (key) {
    headers.set("x-admin-api-key", key);
  }
  return fetch(`${apiBaseUrl}${path}`, { ...options, headers });
}

export async function adminGetJson<T>(path: string): Promise<T> {
  const response = await adminFetch(path);
  if (!response.ok) {
    throw new Error(`Admin request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function adminPatchJson<T>(path: string, body: unknown): Promise<T> {
  const response = await adminFetch(path, { method: "PATCH", body: JSON.stringify(body) });
  if (!response.ok) {
    throw new Error(`Admin request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function adminPostJson<T>(path: string, body: unknown): Promise<T> {
  const response = await adminFetch(path, { method: "POST", body: JSON.stringify(body) });
  if (!response.ok) {
    throw new Error(`Admin request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
