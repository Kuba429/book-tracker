import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { bookRead, bookRead as bookReadInterface } from "../../interfaces";
import defaultCover from "../../utils/defaultCover";
import { supabaseClient } from "../../utils/supabaseClient";

const BookRead: React.FC<{
    bookRead: bookReadInterface;
    setModalState: Dispatch<SetStateAction<boolean | bookRead>>;
}> = ({ bookRead, setModalState }) => {
    const [coverUrl, setCoverUrl] = useState<string>("");
    useEffect(() => {
        // fetching book cover url; falling back to the default one, fetched ahead of time to avoid unnecessary requests
        if (
            bookRead.books.cover_path == "default" ||
            !bookRead.books.cover_path
        ) {
            setCoverUrl(defaultCover!);
        } else {
            const data = supabaseClient.storage
                .from("covers")
                .getPublicUrl(bookRead.books.cover_path).data?.publicURL;
            setCoverUrl(data || defaultCover!); // fall back to default cover if needed
        }
    }, []);
    return (
        <div key={bookRead.books.id} className="bg-slate-300 m-2 p-1 rounded">
            <p>{bookRead.books.author}</p>
            <p>{bookRead.books.title}</p>
            <img src={coverUrl} width="50" height="50" alt="" />
            <p>
                last read page: {bookRead.last_read_page}
                <button
                    onClick={() => {
                        setModalState(bookRead);
                    }}
                >
                    Update
                </button>
            </p>
        </div>
    );
};
export default BookRead;
