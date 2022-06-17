import { useReducer } from "react";
import { bookRead } from "../../interfaces";

export enum ReadBooksKind {
    UPDATE_PROGRESS = "UPDATE_PROGRESS",
    SET_BOOKS = "SET_BOOKS",
}
export interface ReadBooksAction {
    type: ReadBooksKind;
    payload: {
        id?: string;
        lastReadPage?: number;
        books?: Array<bookRead>;
    };
}
const booksReducer = (
    state: Array<bookRead>,
    action: ReadBooksAction
): Array<bookRead> => {
    switch (action.type) {
        case ReadBooksKind.SET_BOOKS:
            return action.payload.books!;
        case ReadBooksKind.UPDATE_PROGRESS:
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
export const useReadBooksReducer = () => {
    return useReducer(booksReducer, []);
};
