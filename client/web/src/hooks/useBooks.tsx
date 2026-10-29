
import { useCallback, useEffect, useState } from "react";
import { bookApi } from "../services/api";
import type { Books } from "../types";

function normalizeBooks(data: unknown): Book[] {
    if (Array.isArray(data)) {
        return data as Book[];
    }

    if (data && typeof data === "object") {
        const response = data as {
            data?: unknown;
            $values?: unknown;
        };

        if (Array.isArray(response.data)) {
            return response.data as Book[];
        }

        if (Array.isArray(response.$values)) {
            return response.$values as Book[];
        }
    }

    return [];
}

export function getApiErrorMessage(
    error: unknown,
    fallback = "An unexpected error occurred."
): string {
    if (error && typeof error === "object" && "response" in error) {
        const response = (
            error as {
                response?: {
                    data?: {
                        detail?: string;
                        title?: string;
                        message?: string;
                        errors?: Record<string, string[]>;
                    };
                };
            }
        ).response;

        const data = response?.data;

        if (data?.errors) {
            return Object.values(data.errors).flat().join("\n");
        }

        if (data?.detail || data?.message || data?.title) {
            return data.detail ?? data.message ?? data.title ?? fallback;
        }
    }

    return error instanceof Error ? error.message : fallback;
}

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadBooks = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await bookApi.getAll();
            setBooks(normalizeBooks(response));
        } catch (err) {
            setError(getApiErrorMessage(err, "Failed to load book types."));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadBooks();
    }, [loadBooks]);

    async function createBook(book: BukuPayload) {
        await bookApi.create({ ...book });
        await loadBooks();
    }

    async function updateBook(id: number, book: BukuPayload) {
        await bookApi.update(id, { ...book });
        await loadBooks();
    }

    async function deleteBook(id: number) {
        await bookApi.delete(id);
        await loadBooks();
    }

    return {
        books,
        loading,
        error,
        loadBooks,
        createBook,
        updateBook,
        deleteBook,
    };
}
