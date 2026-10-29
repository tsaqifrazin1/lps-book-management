
import Modal from "./Modal";

interface ConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export default function ConfirmDialog({
                                          title,
                                          message,
                                          onConfirm,
                                          onCancel,
                                          loading = false,
                                      }: ConfirmDialogProps) {
    return (
        <Modal title={title} onClose={onCancel}>
            <p className="mb-6 text-sm text-gray-600">{message}</p>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </Modal>
    );
}
