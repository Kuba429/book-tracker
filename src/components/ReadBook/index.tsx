import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { readBook, readBook as readBookInterface } from "../../interfaces";
import defaultCover from "../../utils/defaultCover";
import {
    ReadBooksAction,
    ReadBooksKind,
} from "../../utils/hooks/useReadBooksReducer";
import { supabaseClient } from "../../utils/supabaseClient";

const ReadBook: React.FC<{
    readBook: readBookInterface;
    dispatchBooks: Dispatch<ReadBooksAction>;
    setModalState: Dispatch<SetStateAction<boolean | readBook>>;
}> = ({ readBook, setModalState, dispatchBooks }) => {
    const [coverUrl, setCoverUrl] = useState("");
    useEffect(() => {
        // fetching book cover url; falling back to the default one, fetched ahead of time to avoid unnecessary requests
        if (
            readBook.books.cover_path == "default" ||
            !readBook.books.cover_path
        ) {
            setCoverUrl(defaultCover!);
        } else {
            const data = supabaseClient.storage
                .from("covers")
                .getPublicUrl(readBook.books.cover_path).data?.publicURL;
            setCoverUrl(data || defaultCover!); // fall back to default cover if needed
        }
    }, []);
    return (
        <div key={readBook.books.id} className="book-card">
            <img src={coverUrl} alt="Book cover" />
            <div>
                <p>{readBook.books.title}</p>
                <p>{readBook.books.author}</p>
                <p>last read page: {readBook.last_read_page}</p>
                <div>
                    <button
                        onClick={() => {
                            setModalState(readBook);
                        }}
                    >
                        <span>Update</span>
                    </button>
                    <button
                        onClick={() => {
                            removeReadBook(readBook.id, dispatchBooks); // TODO add some kind of prompt to avoid accidental removals
                        }}
                        className="btn-danger"
                    >
                        <span>x</span>
                        {/* TODO change the x to an icon later */}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ReadBook;

const removeReadBook = async (
    id: string,
    dispatchBooks: Dispatch<ReadBooksAction>
) => {
    try {
        const res = await supabaseClient
            .from("read_books")
            .delete()
            .eq("id", id);
        if (res.error) throw new Error(res.error.message);
        console.log(res);
        dispatchBooks({ type: ReadBooksKind.REMOVE_BOOK, payload: { id } });
    } catch (error) {
        console.log(error);
    }
};
