import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({
    title,
    isOpen,
    onClose,
    children,
}: ModalProps) {
    const titleId = useId();
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const previousActiveElement =
            document.activeElement as HTMLElement | null;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "Tab" && dialogRef.current) {
                const focusable =
                    dialogRef.current.querySelectorAll<HTMLElement>(
                        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                    );

                if (focusable.length === 0) {
                    event.preventDefault();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        const firstInput = dialogRef.current?.querySelector<HTMLElement>(
            "input, button, select, textarea",
        );
        firstInput?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousActiveElement?.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className="w-full max-w-lg rounded-xl bg-white shadow-xl"
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2
                        id={titleId}
                        className="text-lg font-semibold text-gray-900"
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <span aria-hidden="true" className="text-xl">
                            &times;
                        </span>
                    </button>
                </div>

                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}
