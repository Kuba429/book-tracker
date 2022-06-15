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
import { book } from "../interfaces";
import { supabaseClient } from "../utils/supabaseClient";

export default function List() {
    const context = useContext(UserContext);
    const [books, setBooks] = useState<Array<book>>([]);
    useEffect(() => {
        getReadBooks(context?.userData.id!, setBooks);
    }, []);
    return (
        <Layout>
            <div>collection</div>
            {books.map((b) => {
                return (
                    <Book userId={context?.userData.id!} book={b} key={b.id} />
                );
            })}
        </Layout>
    );
}

const getReadBooks = async (
    userId: string,
    setBooks: Dispatch<SetStateAction<Array<book>>>
): Promise<void> => {
    // get ids of read books
    let ids: Array<string> = [];
    try {
        // no need to filter books_read with userId, supabase policies take care of it
        const idsRes = await supabaseClient
            .from("books_read")
            .select("book_id");
        if (idsRes.error) throw new Error(idsRes.error.message);
        idsRes.data.forEach((i) => {
            ids.push(i.book_id);
        });
    } catch (error) {
        console.log(error);
    }
    console.log(ids);
    // get the books
    const booksRes = await supabaseClient
        .from("books")
        .select("*")
        .in("id", ids);
    setBooks(booksRes.data ?? []);
};
