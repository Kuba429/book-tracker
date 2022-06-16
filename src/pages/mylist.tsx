import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import BookRead from "../components/BookRead";
import { UserContext } from "../components/ContextWrapper";
import Layout from "../components/Layout";
import { bookRead } from "../interfaces";
import { supabaseClient } from "../utils/supabaseClient";

export default function List() {
    const context = useContext(UserContext);
    const [books, setBooks] = useState<Array<bookRead>>([]);
    useEffect(() => {
        getbookReads(context?.userData.id!, setBooks);
    }, []);
    return (
        <Layout>
            <div>collection</div>
            {books.length > 0 &&
                books.map((b) => {
                    return (
                        <BookRead
                            userId={context?.userData.id!}
                            bookRead={b}
                            key={b.id}
                        />
                    );
                })}
        </Layout>
    );
}

const getbookReads = async (
    userId: string,
    setBooks: Dispatch<SetStateAction<Array<bookRead>>>
): Promise<void> => {
    // get ids of read books
    let ids: Array<string> = [];
    try {
        // no need to filter books_read with userId, supabase policies take care of it
        const res = await supabaseClient.from("books_read").select(`
                last_read_page,
                id,
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
