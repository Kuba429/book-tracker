import React, { Dispatch, SetStateAction } from "react";
import { bookRead } from "../../interfaces";
import {
    ReadBooksAction,
    ReadBooksKind,
} from "../../utils/hooks/useReadBooksReducer";
import { supabaseClient } from "../../utils/supabaseClient";

const UpdateProgressModal: React.FC<{
    setModalState: Dispatch<SetStateAction<boolean | bookRead>>;
}> = ({ setModalState }) => {
    return (
        <div
            onClick={() => setModalState(false)}
            className="h-full w-full absolute z-50 top-0 left-0 bg-black opacity-50"
        >
            asd
        </div>
    );
};
export default UpdateProgressModal;
const updateProgress = async (
    newLastPageRead: number,
    bookReadId: string,
    dispatchBooks: Dispatch<ReadBooksAction>
) => {
    const res = await supabaseClient
        .from("books_read")
        .update({ last_read_page: newLastPageRead })
        .eq("id", bookReadId);
    console.log(res);
    dispatchBooks({
        type: ReadBooksKind.UPDATE_PROGRESS,
        payload: { id: bookReadId, lastReadPage: newLastPageRead },
    });
    return;
};
