import type { Book } from "../../hooks/useBooks";
import BookCard from "./BookCard";

type BookListProps = {
    books: Book[];
    loading: boolean;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
    disabled?: boolean;
};

export default function BookList({
    books,
    loading,
    onEdit,
    onDelete,
    disabled = false,
}: BookListProps) {
    if (loading) {
        return (
            <p className="py-10 text-center text-gray-500">Loading books...</p>
        );
    }

    if (books?.length === 0) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center">
                <p className="font-medium text-gray-700">No books found</p>
                <p className="mt-1 text-sm text-gray-500">
                    Add a book to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {books?.length > 0 ? (
                books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        disabled={disabled}
                    />
                ))
            ) : (
                <div className="col-span-full py-10 text-center text-gray-500">
                    <p className="text-lg font-medium">No books found.</p>
                    <p className="mt-1 text-sm">
                        Try a different search keyword.
                    </p>
                </div>
            )}
        </div>
    );
}
