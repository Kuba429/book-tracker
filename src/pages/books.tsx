import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabaseClient } from "../utils/supabaseClient";
import { book } from "../interfaces";
import Book from "../components/Book";
import { UserContext } from "../components/ContextWrapper";

export default function Books() {
    const [books, setBooks] = useState<Array<book>>([]);
    const context = useContext(UserContext);
    const getBooks = async () => {
        const books: Array<book> = await fetchBooks();
        setBooks(books);
    };

    useEffect(() => {
        getBooks();
    }, []);
    return (
        <Layout>
            <div>books</div>
            <div>
                {books.map((b) => {
                    return (
                        <Book
                            userId={context?.userData.id!}
                            book={b}
                            key={b.id}
                        />
                    );
                })}
            </div>
        </Layout>
    );
}
const fetchBooks = async (): Promise<Array<book>> => {
    const res = await supabaseClient
        .from("books")
        .select("id,title,author,pages,language");
    return res.data as Array<book>;
};
