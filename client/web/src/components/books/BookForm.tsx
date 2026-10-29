
import { useEffect, useState } from "react";
import { bookTypeApi } from "../../services/api";
import type { Book, JenisBuku, CreateBookRequest } from "../../types";
import ErrorMessage from "../common/ErrorMessage";
import Loading from "../common/Loading";

interface BookFormProps {
    book?: Book;
    onSubmit: (data: CreateBookRequest) => Promise<void>;
    onCancel: () => void;
}

export default function BookForm({
                                     book,
                                     onSubmit,
                                     onCancel,
                                 }: BookFormProps) {
    const [judul, setJudul] = useState(book?.judul ?? "");
    const [penulis, setPenulis] = useState(book?.penulis ?? "");
    const [jenisBukuId, setJenisBukuId] = useState(
        book ? String(book.jenisBukuId) : "",
    );
    const [tanggalRilis, setTanggalRilis] = useState(
        book?.tanggalRilis ?? "",
    );
    const [jumlahHalaman, setJumlahHalaman] = useState(
        book ? String(book.jumlahHalaman) : "",
    );
    const [jenisBukus, setJenisBukus] = useState<JenisBuku[]>([]);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        bookTypeApi
            .getAll()
            .then((items) => {
                if (active) setJenisBukus(items);
            })
            .catch((err: unknown) => {
                if (active) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load book types.",
                    );
                }
            })
            .finally(() => {
                if (active) setLoadingTypes(false);
            });

        return () => {
            active = false;
        };
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await onSubmit({
                judul: judul.trim(),
                penulis: penulis.trim(),
                jenisBukuId: Number(jenisBukuId),
                tanggalRilis,
                jumlahHalaman: Number(jumlahHalaman),
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unable to save book.",
            );
        } finally {
            setLoading(false);
        }
    }

    if (loadingTypes) {
        return <Loading message="Loading book types..." />;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ErrorMessage message={error} />

            <div>
                <label htmlFor="judul" className="mb-1 block text-sm font-medium">
                    Judul
                </label>
                <input
                    id="judul"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    maxLength={100}
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="penulis" className="mb-1 block text-sm font-medium">
                    Penulis
                </label>
                <input
                    id="penulis"
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    maxLength={100}
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="jenisBukuId" className="mb-1 block text-sm font-medium">
                    Book Type
                </label>
                <select
                    id="jenisBukuId"
                    value={jenisBukuId}
                    onChange={(e) => setJenisBukuId(e.target.value)}
                    required
                    className="w-full rounded-lg border bg-white px-3 py-2"
                >
                    <option value="">Select a book type</option>
                    {jenisBukus.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.nama}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="tanggalRilis" className="mb-1 block text-sm font-medium">
                    Release Date
                </label>
                <input
                    id="tanggalRilis"
                    type="date"
                    value={tanggalRilis}
                    onChange={(e) => setTanggalRilis(e.target.value)}
                    required
                    className="w-full rounded-lg border px-3 py-2"
                />
            </div>

            <div>
                <label htmlFor="jumlahHalaman" className="mb-1 block text-sm font-medium">
                    Page Count
                </label>
                <input
                    id="jumlahHalaman"
                    type="number"
                    min={1}
                    max={100000}
                    value={jumlahHalaman}
                    onChange={(e) => setJumlahHalaman(e.target.value)}
                    required
                    className="w-full rounded-lg border px-3 py-2"
                />
            </div>

            <div className="flex justify-end gap-3 pt-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : book ? "Update Book" : "Create Book"}
                </button>
            </div>
        </form>
    );
}
