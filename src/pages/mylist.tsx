import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import Book from "../components/Book";
import { UserContext } from "../components/ContextWrapper";
import Layout from "../components/Layout";
import { readBook } from "../interfaces";
import { supabaseClient } from "../utils/supabaseClient";

export default function List() {
    const context = useContext(UserContext);
    const [books, setBooks] = useState<Array<readBook>>([]);
    useEffect(() => {
        getReadBooks(context?.userData.id!, setBooks);
    }, []);
    return (
        <Layout>
            <div>collection</div>
            {books.map((b) => {
                return (
                    <Book
                        userId={context?.userData.id!}
                        book={b.books}
                        key={b.books.id}
                    />
                );
            })}
        </Layout>
    );
}

const getReadBooks = async (
    userId: string,
    setBooks: Dispatch<SetStateAction<Array<readBook>>>
): Promise<void> => {
    // get ids of read books
    let ids: Array<string> = [];
    try {
        // no need to filter books_read with userId, supabase policies take care of it
        const res = await supabaseClient.from("books_read").select(`
                last_read_page,
                book_id,
                books (
                    *
                )
            `);
        if (res.error) throw new Error(res.error.message);
        setBooks(res.data);
    } catch (error) {
        console.log(error);
    }
};
