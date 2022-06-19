import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { readBook, readBook as readBookInterface } from "../../interfaces";
import defaultCover from "../../utils/defaultCover";
import { supabaseClient } from "../../utils/supabaseClient";

const ReadBook: React.FC<{
    readBook: readBookInterface;
    setModalState: Dispatch<SetStateAction<boolean | readBook>>;
}> = ({ readBook, setModalState }) => {
    const [coverUrl, setCoverUrl] = useState<string>("");
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
        <div
            key={readBook.books.id}
            className=" bg-slate-300 m-2 p-1 rounded flex gap-1"
        >
            <img className="object-none" src={coverUrl} alt="Book cover" />
            <div className="w-48">
                <p className="truncate">{readBook.books.title}</p>
                <p className="truncate">{readBook.books.author}</p>
                <p>last read page: {readBook.last_read_page}</p>
                <button
                    className="btn"
                    onClick={() => {
                        setModalState(readBook);
                    }}
                >
                    <span>Update</span>
                </button>
            </div>
        </div>
    );
};
export default ReadBook;
