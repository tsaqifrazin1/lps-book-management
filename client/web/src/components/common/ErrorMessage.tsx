
interface ErrorMessageProps {
    message: string | null;
}

export default function ErrorMessage({
                                         message,
                                     }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
            <p className="whitespace-pre-line">{message}</p>
        </div>
    );
}
