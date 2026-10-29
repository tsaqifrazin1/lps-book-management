interface LoadingProps {
    message?: string;
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
    return (
        <div
            role="status"
            className="flex items-center justify-center gap-3 py-10 text-sm text-gray-500"
        >
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            {message}
        </div>
    );
}
