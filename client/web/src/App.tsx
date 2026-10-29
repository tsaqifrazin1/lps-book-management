
import { useState } from "react";
import Layout from "./components/layout/Layout";
import BooksPage from "./pages/BooksPage";
import BookTypesPage from "./pages/BookTypesPage.tsx";

export default function App() {
  const [activePage, setActivePage] = useState<"books" | "bookTypes">(
      "books"
  );

  return (
      <Layout
          activePage={activePage}
          onNavigate={setActivePage}
      >
        {activePage === "books" ? (
            <BooksPage />
        ) : (
            <BookTypesPage />
        )}
      </Layout>
  );
}
