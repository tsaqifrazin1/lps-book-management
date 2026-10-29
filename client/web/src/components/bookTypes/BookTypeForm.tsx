
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { BookType } from "../../hooks/useBookTypes";

type BookTypeFormProps = {
    bookType?: BookType | null;
    loading: boolean;
    onSubmit: (value: string) => Promise<void>;
    onCancel: () => void;
};

export default function BookTypeForm({
                                         bookType,
                                         loading,
                                         onSubmit,
                                         onCancel,
                                     }: BookTypeFormProps) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setValue(bookType?.bookType ?? "");
        setError("");
    }, [bookType]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedValue = value.trim();

        if (!trimmedValue) {
            setError("Book type is required.");
            return;
        }

        setError("");

        try {
            await onSubmit(trimmedValue);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to save book type."
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="bookType"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Book Type
                </label>

                <input
                    id="bookType"
                    type="text"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    maxLength={100}
                    required
                    disabled={loading}
                    placeholder="Enter book type"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                />

                {error && (
                    <p
                        role="alert"
                        className="mt-2 whitespace-pre-line text-sm text-red-600"
                    >
                        {error}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Saving..." : bookType ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}
