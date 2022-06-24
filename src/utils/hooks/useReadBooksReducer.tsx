import { useReducer } from "react";
import { readBook } from "../../interfaces";

export enum ReadBooksKind {
    UPDATE_PROGRESS = "UPDATE_PROGRESS",
    SET_BOOKS = "SET_BOOKS",
    REMOVE_BOOK = "REMOVE_BOOK",
}
export interface ReadBooksAction {
    type: ReadBooksKind;
    payload: {
        id?: string;
        lastReadPage?: number;
        books?: Array<readBook>;
    };
}
const booksReducer = (
    state: Array<readBook>,
    action: ReadBooksAction
): Array<readBook> => {
    switch (action.type) {
        case ReadBooksKind.SET_BOOKS:
            return action.payload.books!;
        case ReadBooksKind.UPDATE_PROGRESS:
            const copy = [...state]; // i'm not sure if changing the state itself before returning it is ok so just to be safe im copying it
            let newLastPageRead = action.payload.lastReadPage!;
            let index = 0;
            state.find((x, i) => {
                // find index of book to change
                index = i;
                return x.id == action.payload.id;
            });
            if (newLastPageRead > copy[index].books.pages)
                newLastPageRead = copy[index].books.pages; // cap last read page
            copy[index].last_read_page = newLastPageRead;
            return copy;
        case ReadBooksKind.REMOVE_BOOK:
            state = state.filter((i) => i.id !== action.payload.id);
            return state;
    }
};
export const useReadBooksReducer = () => {
    return useReducer(booksReducer, []);
};
