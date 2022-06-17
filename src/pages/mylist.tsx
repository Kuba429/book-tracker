import { Dispatch, useContext, useEffect, useReducer } from "react";
import BookRead from "../components/BookRead";
import { UserContext } from "../components/ContextWrapper";
import Layout from "../components/Layout";
import { bookRead } from "../interfaces";
import { supabaseClient } from "../utils/supabaseClient";

export enum BooksKind {
    UPDATE_PROGRESS = "UPDATE_PROGRESS",
    SET_BOOKS = "SET_BOOKS",
}
export interface BooksAction {
    type: BooksKind;
    payload: {
        id?: string;
        lastReadPage?: number;
        books?: Array<bookRead>;
    };
}
const booksReducer = (
    state: Array<bookRead>,
    action: BooksAction
): Array<bookRead> => {
    switch (action.type) {
        case BooksKind.SET_BOOKS:
            return action.payload.books!;
        case BooksKind.UPDATE_PROGRESS:
            const copy = [...state]; // i'm not sure if changing the state itself before returning it is ok so just to be safe im copying it
            let index = 0;
            state.find((x, i) => {
                // find index of book to change
                index = i;
                return x.id == action.payload.id;
            });
            copy[index].last_read_page = action.payload.lastReadPage!;
            return copy;
    }
};
export default function List() {
    const context = useContext(UserContext);
    const [books, dispatchBooks] = useReducer(booksReducer, []);
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
    dispatchBooks: Dispatch<BooksAction>
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
            type: BooksKind.SET_BOOKS,
            payload: { books: res.data },
        });
    } catch (error) {
        console.log(error);
    }
};
