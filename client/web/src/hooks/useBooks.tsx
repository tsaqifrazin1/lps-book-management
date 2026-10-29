import { useCallback, useEffect, useState } from "react";
import { bookApi, bookTypeApi } from "../services/api";
import type { BukuPayload } from "../types;";

export type Book = BookResponse;

export type BookType = {
    id: number;
    name: string;
};

export function getErrorMessage(error: unknown, fallback: string): string {
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
    const [bookTypes, setBookTypes] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadBooks = useCallback(async () => {
        const response = await bookApi.getAll();
        setBooks(response);
    }, []);

    const loadBookTypes = useCallback(async () => {
        const response = await bookTypeApi.getAll();


        setBookTypes(
            response.map((item) => ({
                id: item.id,
                nama: item.name ?? item.nama ?? "",
            })),
        );
    }, []);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            await Promise.all([loadBooks(), loadBookTypes()]);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to load books."));
        } finally {
            setLoading(false);
        }
    }, [loadBooks, loadBookTypes]);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const createBook = async (data: BukuPayload) => {
        await bookApi.create(data);
        await loadBooks();
    };

    const updateBook = async (id: number, data: BukuPayload) => {
        await bookApi.update(id, data);
        await loadBooks();
    };

    const deleteBook = async (id: number) => {
        await bookApi.delete(id);
        await loadBooks();
    };

    const exportBooks = async (search: string) => {
        return bookApi.exportCsv(search);
    };

    const searchBooks = useCallback(async (search: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await bookApi.getAll(search);

            setBooks(response);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to search books.",
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        books,
        bookTypes,
        loading,
        error,
        setError,
        refresh,
        createBook,
        updateBook,
        deleteBook,
        exportBooks,
        searchBooks,
    };
}
