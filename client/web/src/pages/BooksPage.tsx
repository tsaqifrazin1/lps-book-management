import { useCallback, useState, useEffect } from "react";
import Modal from "../components/common/Modal";
import BookForm from "../components/books/BookForm";
import BookList from "../components/books/BookList";
import { getErrorMessage, useBooks, type Book } from "../hooks/useBooks";
import type { BookRequest } from "../services/api";

export default function BooksPage() {
    const {
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
    } = useBooks();

    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [deletingBook, setDeletingBook] = useState<Book | null>(null);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const closeModal = useCallback(() => {
        if (saving) return;

        setIsModalOpen(false);
        setEditingBook(null);
    }, [saving]);
    
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void (async () => {
                try {
                    const trimmed = search.trim();

                    if (trimmed === "") {
                        await refresh();
                    } else {
                        await searchBooks(trimmed);
                    }
                } catch (err) {
                    setError(getErrorMessage(err, "Failed to search books."));
                }
            })();
        }, 500);

        return () => window.clearTimeout(timeoutId);
    }, [search, searchBooks, refresh, setError]);

    function handleAdd() {
        setError("");
        setSuccessMessage("");
        setEditingBook(null);
        setIsModalOpen(true);
    }

    function handleEdit(book: Book) {
        setError("");
        setSuccessMessage("");
        setEditingBook(book);
        setIsModalOpen(true);
    }

    async function handleSubmit(data: BookRequest) {
        setSaving(true);
        setError("");
        setSuccessMessage("");

        try {
            if (editingBook) {
                await updateBook(editingBook.id, data);
                setSuccessMessage("Book updated successfully.");
            } else {
                await createBook(data);
                setSuccessMessage("Book created successfully.");
            }

            setIsModalOpen(false);
            setEditingBook(null);
        } catch (err) {
            const message = getErrorMessage(err, "Failed to save book.");
            setError(message);
            throw new Error(message, { cause: err });
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!deletingBook || saving) return;

        setSaving(true);
        setError("");
        setSuccessMessage("");

        try {
            await deleteBook(deletingBook.id);
            setDeletingBook(null);
            setSuccessMessage("Book deleted successfully.");
        } catch (err) {
            setError(getErrorMessage(err, "Failed to delete book."));
        } finally {
            setSaving(false);
        }
    }

    async function handleRefresh() {
        setSuccessMessage("");
        await refresh();
    }

    async function handleExport() {
        const response = await exportBooks(search);
        const url = URL.createObjectURL(response);
        const link = document.createElement("a");

        link.href = url;
        link.download = "books.csv";
        link.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Books</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your book collection.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => void handleExport()}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        Export CSV
                    </button>

                    <button
                        type="button"
                        onClick={() => void handleRefresh()}
                        disabled={loading || saving}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                    >
                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={saving}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        + Add Book
                    </button>
                </div>
            </div>

            <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or author..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            {error && (
                <div
                    role="alert"
                    className="mb-4 flex items-start justify-between gap-3 rounded-md bg-red-50 p-4 text-sm text-red-700"
                >
                    <p className="whitespace-pre-line">{error}</p>
                    <button
                        type="button"
                        onClick={() => setError("")}
                        aria-label="Dismiss error"
                        className="font-bold"
                    >
                        &times;
                    </button>
                </div>
            )}

            {successMessage && (
                <div
                    role="status"
                    className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700"
                >
                    {successMessage}
                </div>
            )}

            <BookList
                books={books}
                loading={loading}
                onEdit={handleEdit}
                onDelete={setDeletingBook}
                disabled={saving}
            />

            <Modal
                title={editingBook ? "Edit Book" : "Add Book"}
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <BookForm
                    book={editingBook}
                    bookTypes={bookTypes}
                    saving={saving}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                />
            </Modal>

            <Modal
                title="Delete Book"
                isOpen={deletingBook !== null}
                onClose={() => {
                    if (!saving) setDeletingBook(null);
                }}
            >
                {deletingBook && (
                    <div>
                        <p className="text-sm text-gray-700">
                            Are you sure you want to delete{" "}
                            <strong>{deletingBook.judul}</strong>? This action
                            cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setDeletingBook(null)}
                                disabled={saving}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => void handleDelete()}
                                disabled={saving}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {saving ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}