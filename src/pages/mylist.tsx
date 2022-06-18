import { Dispatch, useEffect, useState } from "react";
import BookRead from "../components/BookRead";
import UpdateProgressModal from "../components/BookRead/UpdateProgressModal";
import Layout from "../components/Layout";
import { bookRead } from "../interfaces";
import {
    ReadBooksAction,
    ReadBooksKind,
    useReadBooksReducer,
} from "../utils/hooks/useReadBooksReducer";
import { supabaseClient } from "../utils/supabaseClient";

export default function List() {
    const [books, dispatchBooks] = useReadBooksReducer();
    const [modalState, setModalState] = useState<boolean | bookRead>(false);
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
                            setModalState={setModalState}
                            key={b.id}
                        />
                    );
                })}
            {modalState && (
                <UpdateProgressModal
                    modalState={modalState as bookRead} // at this point modalState is bound to not be false (therefore not a bool since true is never assigned to it)
                    setModalState={setModalState}
                    dispatchBooks={dispatchBooks}
                />
            )}
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
