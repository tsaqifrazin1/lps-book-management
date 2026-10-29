
import type { Book, BookPayload, BookType } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(
            (await response.text()) || `Request failed: ${response.status}`,
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export const bookApi = {
    getAll: () => request<Book[]>("/books"),

    create: (payload: BookPayload) =>
        request<Book>("/books", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    update: (id: number, payload: BookPayload) =>
        request<Book>(`/books/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    delete: (id: number) =>
        request<void>(`/books/${id}`, {
            method: "DELETE",
        }),
};

export const bookTypeApi = {
    getAll: () => request<BookType[]>("/book-types"),

    create: (payload: Pick<BookType, "name">) =>
        request<BookType>("/book-types", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    delete: (id: number) =>
        request<void>(`/book-types/${id}`, {
            method: "DELETE",
        }),
    
    update: (id: number, payload: Pick<BookType, "name" | "type">) => {
        request<BookType>(`/book-types/${id}`, {
            method: "PUT",
        })
    }
};
