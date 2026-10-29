
import type { Book } from "../../types";

interface BookDetailsProps {
    book: Book;
}

export default function BookDetails({ book }: BookDetailsProps) {
    const fields = [
        ["Judul", book.judul],
        ["Penulis", book.penulis],
        ["Jenis Buku Id", String(book.jenisBukuId)],
        ["Tanggal Rilis", book.tanggalRilis],
        ["Jumlah Halaman", String(book.jumlahHalaman)],
    ];

    return (
        <dl className="divide-y">
            {fields.map(([label, value]) => (
                <div
                    key={label}
                    className="grid grid-cols-3 gap-4 py-3 text-sm"
                >
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="col-span-2 font-medium text-gray-900">
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
