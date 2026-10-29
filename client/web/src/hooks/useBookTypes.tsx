import { useCallback, useEffect, useState } from "react";
import { bookTypeApi } from "../services/api";

function normalizeBookTypes(data: unknown): BookType[] {
    if (Array.isArray(data)) {
        return data as BookType[];
    }

    if (data && typeof data === "object") {
        const response = data as {
            data?: unknown;
            $values?: unknown;
        };

        if (Array.isArray(response.data)) {
            return response.data as BookType[];
        }

        if (Array.isArray(response.$values)) {
            return response.$values as BookType[];
        }
    }

    return [];
}

export function getApiErrorMessage(
    error: unknown,
    fallback = "An unexpected error occurred.",
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

export function useBookTypes() {
    const [bookTypes, setBookTypes] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadBookTypes = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await bookTypeApi.getAll();
            setBookTypes(normalizeBookTypes(response));
        } catch (err) {
            setError(getApiErrorMessage(err, "Failed to load book types."));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadBookTypes();
    }, [loadBookTypes]);

    async function createBookType(nama: string) {
        await bookTypeApi.create({ nama });
        await loadBookTypes();
    }

    async function updateBookType(id: number, nama: string) {
        await bookTypeApi.update(id, { nama });
        await loadBookTypes();
    }

    async function deleteBookType(id: number) {
        await bookTypeApi.delete(id);
        await loadBookTypes();
    }

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            await Promise.all([loadBookTypes()]);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to load books."));
        } finally {
            setLoading(false);
        }
    }, [loadBookTypes]);

    return {
        bookTypes,
        loading,
        error,
        loadBookTypes,
        createBookType,
        updateBookType,
        deleteBookType,
        refresh
    };
}
