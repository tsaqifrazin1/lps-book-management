import { useCallback, useState } from "react";
import BookTypeForm from "../components/bookTypes/BookTypeForm";
import BookTypeList from "../components/bookTypes/BookTypeList";
import Modal from "../components/common/Modal";
import { getApiErrorMessage, useBookTypes } from "../hooks/useBookTypes";
import type { BookType } from "../hooks/useBookTypes";

export default function BookTypesPage() {
    const {
        bookTypes,
        loading,
        error,
        createBookType,
        updateBookType,
        deleteBookType,
        refresh
    } = useBookTypes();

    const [showModal, setShowModal] = useState(false);
    const [editingBookType, setEditingBookType] = useState<BookType | null>(
        null,
    );
    const [success, setSuccess] = useState("");
    const [actionError, setActionError] = useState("");
    const [saving, setSaving] = useState(false);

    const closeModal = useCallback(() => {
        if (!saving) {
            setShowModal(false);
            setEditingBookType(null);
        }
    }, [saving]);

    function openCreateModal() {
        setEditingBookType(null);
        setActionError("");
        setSuccess("");
        setShowModal(true);
    }

    function openEditModal(item: BookType) {
        setEditingBookType(item);
        setActionError("");
        setSuccess("");
        setShowModal(true);
    }

    async function handleSubmit(value: string) {
        setSaving(true);
        setActionError("");
        setSuccess("");

        try {
            if (editingBookType) {
                await updateBookType(editingBookType.id, value);
                setSuccess("Book type updated successfully.");
            } else {
                await createBookType(value);
                setSuccess("Book type created successfully.");
            }

            setShowModal(false);
            setEditingBookType(null);
        } catch (err) {
            throw new Error(
                getApiErrorMessage(err, "Failed to save book type."),
                { cause: err },
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleRefresh() {
        setSuccess("");
        await refresh();
    }


    async function handleDelete(item: BookType) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.bookType}"?`,
        );

        if (!confirmed) return;

        setActionError("");
        setSuccess("");
        setSaving(true);

        try {
            await deleteBookType(item.id);

            if (editingBookType?.id === item.id) {
                setShowModal(false);
                setEditingBookType(null);
            }

            setSuccess("Book type deleted successfully.");
        } catch (err) {
            setActionError(
                getApiErrorMessage(err, "Failed to delete book type."),
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Book Types
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage the types used to categorize books.
                    </p>
                </div>

                <div className="flex gap-2">
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
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <span
                            aria-hidden="true"
                            className="mr-2 text-lg leading-none"
                        >
                            +
                        </span>
                        Add Book Type
                    </button>
                </div>
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

            <BookTypeList
                bookTypes={bookTypes}
                loading={loading || saving}
                onEdit={openEditModal}
                onDelete={(item) => void handleDelete(item)}
            />

            <Modal
                title={editingBookType ? "Edit Book Type" : "Add Book Type"}
                isOpen={showModal}
                onClose={closeModal}
            >
                <BookTypeForm
                    key={editingBookType?.id ?? "new-book-type"}
                    bookType={editingBookType}
                    loading={saving}
                    onSubmit={handleSubmit}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
}
