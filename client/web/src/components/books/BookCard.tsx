import type { Book } from "../../hooks/useBooks";

type BookCardProps = {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
    disabled?: boolean;
};

export default function BookCard({
    book,
    onEdit,
    onDelete,
    disabled = false,
}: BookCardProps) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-900">
                    {book.judul}
                </h3>

                <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {book.jenisBukuNama ?? `Type #${book.jenisBukuId}`}
                </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
                Penulis: {book.penulis}
            </p>

            <p className="mt-1 text-sm text-gray-600">
                Tanggal Rilis: {book.tanggalRilis?.slice(0, 10) || "—"}
            </p>

            <p className="mt-1 text-sm text-gray-600">
                Jumlah Halaman: {book.jumlahHalaman}
            </p>

            <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onEdit(book)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                    Edit
                </button>

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onDelete(book)}
                    className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                    Delete
                </button>
            </div>
        </article>
    );
}
