
import { Pencil, Trash2 } from "lucide-react";
import type { Book } from "../../types";

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
    onView: (book: Book) => void;
}

export default function BookCard({
                                     book,
                                     onEdit,
                                     onDelete,
                                     onView,
                                 }: BookCardProps) {
    return (
        <article className="rounded-xl border bg-white p-5 shadow-sm">
            <button
                type="button"
                onClick={() => onView(book)}
                className="block w-full text-left"
            >
                <h3 className="font-semibold text-gray-900">
                    {book.judul}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{book.penulis}</p>
                <p className="mt-3 text-sm text-gray-600">
                    Released: {book.tanggalRilis}
                </p>
                <p className="text-sm text-gray-600">
                    Pages: {book.jumlahHalaman}
                </p>
            </button>

            <div className="mt-4 flex justify-end gap-2 border-t pt-3">
                <button
                    type="button"
                    onClick={() => onEdit(book)}
                    aria-label={`Edit ${book.title}`}
                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                >
                    <Pencil size={17} />
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(book)}
                    aria-label={`Delete ${book.title}`}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                >
                    <Trash2 size={17} />
                </button>
            </div>
        </article>
    );
}
