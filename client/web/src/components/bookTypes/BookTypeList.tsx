import type { BookType } from "../../types";

type BookTypeListProps = {
    bookTypes: BookType[];
    loading: boolean;
    onEdit: (bookType: BookType) => void;
    onDelete: (bookType: BookType) => void;
};

export default function BookTypeList({
    bookTypes,
    loading,
    onEdit,
    onDelete,
}: BookTypeListProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="font-semibold text-gray-800">Book Type List</h2>
            </div>

            {loading && bookTypes.length === 0 ? (
                <p className="p-5 text-sm text-gray-500">
                    Loading book types...
                </p>
            ) : bookTypes.length === 0 ? (
                <p className="p-5 text-sm text-gray-500">
                    No book types found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-5 py-3 font-medium">ID</th>
                                <th className="px-5 py-3 font-medium">
                                    Book Type
                                </th>
                                <th className="px-5 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {bookTypes.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3 text-gray-500">
                                        {item.id}
                                    </td>

                                    <td className="px-5 py-3 font-medium text-gray-900">
                                        {item.nama}
                                    </td>

                                    <td className="space-x-3 whitespace-nowrap px-5 py-3 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(item)}
                                            disabled={loading}
                                            className="font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDelete(item)}
                                            disabled={loading}
                                            className="font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
