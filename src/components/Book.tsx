import React, { useEffect, useState } from "react";
import { book as bookInterface } from "../interfaces";
import defaultCover from "../utils/defaultCover";
import { supabaseClient } from "../utils/supabaseClient";

const Book: React.FC<{ book: bookInterface; userId: string }> = ({
    book,
    userId,
}) => {
    const [coverUrl, setCoverUrl] = useState("");
    useEffect(() => {
        // fetching book cover url; falling back to the default one, fetched ahead of time to avoid unnecessary requests
        if (book.cover_path == "default" || !book.cover_path) {
            setCoverUrl(defaultCover!);
        } else {
            const data = supabaseClient.storage
                .from("covers")
                .getPublicUrl(book.cover_path).data?.publicURL;
            setCoverUrl(data || defaultCover!); // fall back to default cover if needed
        }
    }, []);
    return (
        <div key={book.id} className="book-card">
            <img
                className="object-contain w-24 h-36" // i want book covers to always take up the same space
                src={coverUrl}
                alt="Book cover"
            />
            <div>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <p>{book.pages} pages</p>
                <button
                    className="btn-primary"
                    onClick={() => addBook(book.id, userId!)}
                >
                    <span>Add</span>
                </button>
            </div>
        </div>
    );
};
export default Book;

const addBook = async (bookId: string, userId: string) => {
    if (!userId) {
        return;
    }
    // check if book was already added to user's list
    try {
        const resCheck = await supabaseClient
            .from("read_books")
            .select("id")
            .eq("book_id", bookId)
            .eq("user_id", userId);
        if (resCheck.data?.length! > 0)
            throw new Error("This book is already in your list");
        const res = await supabaseClient.from("read_books").insert([
            {
                user_id: userId,
                book_id: bookId,
            },
        ]);
        if (res.error) throw new Error(res.error.message);
    } catch (error) {
        console.error(error);
    }
};
