import { Dispatch, useEffect, useState } from "react";
import ReadBook from "../components/ReadBook";
import UpdateProgressModal from "../components/ReadBook/UpdateProgressModal";
import Layout from "../components/Layout";
import { readBook } from "../interfaces";
import {
    ReadBooksAction,
    ReadBooksKind,
    useReadBooksReducer,
} from "../utils/hooks/useReadBooksReducer";
import { supabaseClient } from "../utils/supabaseClient";

export default function List() {
    const [books, dispatchBooks] = useReadBooksReducer();
    const [modalState, setModalState] = useState<boolean | readBook>(false);
    useEffect(() => {
        getbooksRead(dispatchBooks);
    }, []);
    return (
        <Layout>
            <h1 className="text-white text-4xl">My List</h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2">
                {books.length > 0 &&
                    books.map((b) => {
                        return (
                            <ReadBook
                                readBook={b}
                                setModalState={setModalState}
                                key={b.id}
                            />
                        );
                    })}
            </div>

            {modalState && (
                <UpdateProgressModal
                    modalState={modalState as readBook} // at this point modalState is bound to not be false (therefore not a bool since true is never assigned to it)
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
        // no need to filter read_books with userId, supabase policies take care of it
        const res = await supabaseClient.from("read_books").select(`
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
