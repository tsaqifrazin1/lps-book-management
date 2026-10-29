import { BookOpen, Layers } from "lucide-react";

type Page = "books" | "bookTypes";

interface SidebarProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
    const items = [
        { id: "books" as const, label: "Books", icon: BookOpen },
        { id: "bookTypes" as const, label: "Book Types", icon: Layers },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-white p-5 md:block">
            <h1 className="mb-8 text-xl font-bold">LPS Books</h1>

            <nav className="space-y-2">
                {items.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => onNavigate(id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left ${
                            activePage === id
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        <Icon size={18} />
                        {label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
