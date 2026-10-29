
import { useCallback, useState } from "react";
import BookForm from "../components/books/BookForm";
import BookList from "../components/books/BookList";
import Modal from "../components/common/Modal";
import {
    getApiErrorMessage,
    useBooks,
} from "../hooks/useBooks";
import type { Book } from "../hooks/useBooks";

export default function BooksPage() {
    const {
       books,
        loading,
        error,
        createBook,
        updateBook,
        deleteBook,
    } = useBooks();

    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(
        null
    );
    const [success, setSuccess] = useState("");
    const [actionError, setActionError] = useState("");
    const [saving, setSaving] = useState(false);

    const closeModal = useCallback(() => {
        if (!saving) {
            setShowModal(false);
            setEditingBook(null);
        }
    }, [saving]);

    function openCreateModal() {
        setEditingBook(null);
        setActionError("");
        setSuccess("");
        setShowModal(true);
    }

    function openEditModal(item: Book) {
        setEditingBook(item);
        setActionError("");
        setSuccess("");
        setShowModal(true);
    }

    async function handleSubmit(value: string) {
        setSaving(true);
        setActionError("");
        setSuccess("");

        try {
            if (editingBook) {
                await updateBook(editingBook.id, value);
                setSuccess("Book updated successfully.");
            } else {
                await createBook(value);
                setSuccess("Book created successfully.");
            }

            setShowModal(false);
            setEditingBook(null);
        } catch (err) {
            throw new Error(getApiErrorMessage(err, "Failed to save book."));
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(item: Book) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.bookType}"?`
        );

        if (!confirmed) return;

        setActionError("");
        setSuccess("");
        setSaving(true);

        try {
            await deleteBook(item.id);

            if (editingBook?.id === item.id) {
                setShowModal(false);
                setEditingBook(null);
            }

            setSuccess("Book deleted successfully.");
        } catch (err) {
            setActionError(
                getApiErrorMessage(err, "Failed to delete book.")
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Book</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage the book.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
          <span aria-hidden="true" className="mr-2 text-lg leading-none">
            +
          </span>
                    Add Book
                </button>
            </div>

            {(error || actionError) && (
                <div
                    role="alert"
                    className="whitespace-pre-line rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {actionError || error}
                </div>
            )}

            {success && (
                <div
                    role="status"
                    className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                >
                    {success}
                </div>
            )}

            <BookList
                books={books}
                loading={loading || saving}
                onEdit={openEditModal}
                onDelete={(item) => void handleDelete(item)}
            />

            <Modal
                title={editingBook ? "Edit Book" : "Add Book"}
                isOpen={showModal}
                onClose={closeModal}
            >
                <BookForm
                    key={editingBook?.id ?? "new-book"}
                    bookType={editingBook}
                    loading={saving}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
}
