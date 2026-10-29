import { useState } from "react";
import type { FormEvent } from "react";
import type { Book, BookType } from "../../hooks/useBooks";
import type { BookRequest } from "../../services/api";

type BookFormProps = {
    book?: Book | null;
    bookTypes: BookType[];
    saving: boolean;
    onSubmit: (data: BookRequest) => Promise<void>;
    onCancel: () => void;
};

export default function BookForm({
    book,
    bookTypes,
    saving,
    onSubmit,
    onCancel,
}: BookFormProps) {
    const [judul, setJudul] = useState(book?.judul ?? "");
    const [penulis, setPenulis] = useState(book?.penulis ?? "");
    const [jenisBukuId, setBookTypeId] = useState(book?.jenisBukuId ?? "");
    const [tanggalRilis, setTanggalRilis] = useState(book?.tanggalRilis ?? "");
    const [jumlahHalaman, setJumlahHalaman] = useState(book?.jumlahHalaman ?? "");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const pages = Number(jumlahHalaman);
        const selectedTypeId = Number(jenisBukuId);

        if (!judul.trim() || !penulis.trim()) {
            setError("Judul and penulis are required.");
            return;
        }

        if (!jenisBukuId || !Number.isInteger(selectedTypeId)) {
            setError("Please select a book type.");
            return;
        }

        if (!tanggalRilis) {
            setError("Release date is required.");
            return;
        }

        if (!Number.isInteger(pages) || pages <= 0) {
            setError("Page count must be a positive integer.");
            return;
        }

        try {
            await onSubmit({
                judul: judul.trim(),
                penulis: penulis.trim(),
                jenisBukuId: selectedTypeId,
                tanggalRilis,
                jumlahHalaman: pages,
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to save book.",
            );
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div
                    role="alert"
                    className="whitespace-pre-line rounded-md bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="judul"
                    className="mb-1 block text-sm font-medium"
                >
                    Judul
                </label>
                <input
                    id="judul"
                    value={judul}
                    onChange={(event) => setJudul(event.target.value)}
                    required
                    maxLength={200}
                    disabled={saving}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div>
                <label
                    htmlFor="penulis"
                    className="mb-1 block text-sm font-medium"
                >
                    Penulis
                </label>
                <input
                    id="penulis"
                    value={penulis}
                    onChange={(event) => setPenulis(event.target.value)}
                    required
                    maxLength={150}
                    disabled={saving}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div>
                <label
                    htmlFor="jenisBukuId"
                    className="mb-1 block text-sm font-medium"
                >
                    Book type
                </label>
                <select
                    id="jenisBukuId"
                    value={jenisBukuId}
                    onChange={(event) => setBookTypeId(event.target.value)}
                    required
                    disabled={saving || bookTypes?.length === 0}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Select a book type</option>
                    {bookTypes?.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.nama}
                        </option>
                    ))}
                </select>

                {bookTypes?.length === 0 && (
                    <p className="mt-1 text-xs text-amber-700">
                        No book types are available. Add a book type first.
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="tanggalRilis"
                    className="mb-1 block text-sm font-medium"
                >
                    Release date
                </label>
                <input
                    id="tanggalRilis"
                    type="date"
                    value={tanggalRilis}
                    onChange={(event) => setTanggalRilis(event.target.value)}
                    required
                    disabled={saving}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div>
                <label
                    htmlFor="jumlahHalaman"
                    className="mb-1 block text-sm font-medium"
                >
                    Page count
                </label>
                <input
                    id="jumlahHalaman"
                    type="number"
                    min="1"
                    step="1"
                    value={jumlahHalaman}
                    onChange={(event) => setJumlahHalaman(event.target.value)}
                    required
                    disabled={saving}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={saving || bookTypes?.length === 0}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving
                        ? "Saving..."
                        : book
                          ? "Update Book"
                          : "Create Book"}
                </button>
            </div>
        </form>
    );
}
