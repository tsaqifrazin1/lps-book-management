
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header.tsx";

type Page = "books" | "bookTypes";

interface LayoutProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
    children: ReactNode;
}

export default function Layout({
                                   activePage,
                                   onNavigate,
                                   children,
                               }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activePage={activePage}
                onNavigate={onNavigate}
            />

            <div className="md:ml-64">
                <Header />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
