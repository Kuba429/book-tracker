import { Dispatch, useContext, useEffect } from "react";
import BookRead from "../components/BookRead";
import { UserContext } from "../components/ContextWrapper";
import Layout from "../components/Layout";
import {
    ReadBooksAction,
    ReadBooksKind,
    useReadBooksReducer,
} from "../utils/hooks/useReadBooksReducer";
import { supabaseClient } from "../utils/supabaseClient";

export default function List() {
    const context = useContext(UserContext);
    const [books, dispatchBooks] = useReadBooksReducer();
    useEffect(() => {
        getbooksRead(dispatchBooks);
    }, []);
    return (
        <Layout>
            <div>collection</div>
            {books.length > 0 &&
                books.map((b) => {
                    return (
                        <BookRead
                            bookRead={b}
                            dispatchBooks={dispatchBooks}
                            key={b.id}
                        />
                    );
                })}
        </Layout>
    );
}

const getbooksRead = async (
    dispatchBooks: Dispatch<ReadBooksAction>
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
        dispatchBooks({
            type: ReadBooksKind.SET_BOOKS,
            payload: { books: res.data },
        });
    } catch (error) {
        console.log(error);
    }
};
