import React, { Dispatch, SetStateAction, useState } from "react";
import { bookRead } from "../../interfaces";
import {
    ReadBooksAction,
    ReadBooksKind,
} from "../../utils/hooks/useReadBooksReducer";
import { supabaseClient } from "../../utils/supabaseClient";

const UpdateProgressModal: React.FC<{
    setModalState: Dispatch<SetStateAction<bookRead | boolean>>;
    modalState: bookRead;
    dispatchBooks: Dispatch<ReadBooksAction>;
}> = ({ setModalState, modalState, dispatchBooks }) => {
    const [newPage, setNewPage] = useState(modalState.last_read_page);
    return (
        <>
            {/* Dim the space behind the modal and make modal disappear on click */}
            {/* Modal itself can't be a child of element below because click on modal would trigger event listener and update state */}
            <div
                onClick={() => setModalState(false)}
                className="h-full w-full absolute z-30 top-0 left-0 bg-black opacity-50"
            ></div>
            <div
                className={`absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-11/12 h-5/6 bg-white`}
            >
                <input
                    value={newPage}
                    onInput={(e) => {
                        setNewPage(
                            parseInt((e.target as HTMLInputElement).value)
                        );
                    }}
                    type="range"
                    min={0}
                    max={modalState.books.pages}
                />
                <p>{newPage}</p>
                <input
                    type="number"
                    value={newPage}
                    min={0}
                    max={modalState.books.pages}
                    onInput={(e) => {
                        setNewPage(
                            parseInt((e.target as HTMLInputElement).value)
                        );
                    }}
                />
                <button
                    onClick={() =>
                        updateProgress(newPage, modalState.id, dispatchBooks)
                    }
                >
                    Update
                </button>
            </div>
        </>
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
