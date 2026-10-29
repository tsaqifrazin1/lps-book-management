
import { useState } from "react";
import type { Book } from "../../types";
import BookCard from "./BookCard";
import BookForm from "./BookForm";
import BookDetails from "./BookDetails";
import Modal from "../common/Modal";
import ConfirmDialog from "../common/ConfirmDialog";
import ErrorMessage from "../common/ErrorMessage";
import { bookApi } from "../../services/api";

interface BookListProps {
    books: Book[];
    onRefresh: () => Promise<void>;
}

export default function BookList({
                                     books,
                                     onRefresh,
                                 }: BookListProps) {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [deletingBook, setDeletingBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete() {
        if (!deletingBook) return;

        setLoading(true);
        setError(null);

        try {
            await bookApi.delete(deletingBook.id);
            setDeletingBook(null);
            await onRefresh();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to delete book.",
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(
        data: Parameters<typeof bookApi.create>[0],
    ) {
        if (editingBook) {
            await bookApi.update(editingBook.id, data);
        } else {
            await bookApi.create(data);
        }

        setShowCreate(false);
        setEditingBook(null);
        await onRefresh();
    }

    return (
        <div>
            <ErrorMessage message={error} />

            <div className="mb-5 flex justify-end">
                <button
                    type="button"
                    onClick={() => {
                        setEditingBook(null);
                        setShowCreate(true);
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Add Book
                </button>
            </div>

            {books.length === 0 ? (
                <p className="rounded-xl border bg-white p-8 text-center text-gray-500">
                    No books found.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onView={setSelectedBook}
                            onEdit={(book) => {
                                setEditingBook(book);
                                setShowCreate(true);
                            }}
                            onDelete={setDeletingBook}
                        />
                    ))}
                </div>
            )}

            {showCreate && (
                <Modal
                    title={editingBook ? "Edit Book" : "Add Book"}
                    onClose={() => {
                        setShowCreate(false);
                        setEditingBook(null);
                    }}
                >
                    <BookForm
                        book={editingBook ?? undefined}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setShowCreate(false);
                            setEditingBook(null);
                        }}
                    />
                </Modal>
            )}

            {selectedBook && (
                <Modal
                    title="Book Details"
                    onClose={() => setSelectedBook(null)}
                >
                    <BookDetails book={selectedBook} />
                </Modal>
            )}

            {deletingBook && (
                <ConfirmDialog
                    title="Delete Book"
                    message={`Are you sure you want to delete "${deletingBook.title}"?`}
                    loading={loading}
                    onCancel={() => setDeletingBook(null)}
                    onConfirm={() => void handleDelete()}
                />
            )}
        </div>
    );
}
