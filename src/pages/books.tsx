import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabaseClient } from "../utils/supabaseClient";
import { book } from "../interfaces";

export default function Books() {
    const [books, setBooks] = useState<Array<book>>([]);
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
                        <div
                            key={b.id}
                            className="bg-slate-300 m-2 p-1 rounded"
                        >
                            <p>{b.author}</p>
                            <p>{b.title}</p>
                        </div>
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
    console.log(res);
    return res.data as Array<book>;
};
