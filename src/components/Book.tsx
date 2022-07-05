import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { book as bookInterface } from "interfaces";
import defaultCover from "utils/defaultCover";
import { supabaseClient } from "utils/supabaseClient";

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
	const mutation = useMutation(
		async () => {
			// add book to list mutation
			if (!userId)
				throw new Error("There was a problem with authentication");
			const resCheck = await supabaseClient
				.from("read_books")
				.select("id")
				.eq("book_id", book.id)
				.eq("user_id", userId);
			if (resCheck.data?.length! > 0)
				// ensure the book isn't already in this user's list
				throw new Error("This book is already in your list");
			const res = await supabaseClient.from("read_books").insert([
				{
					user_id: userId,
					book_id: book.id,
				},
			]);
			if (res.error) throw new Error(res.error.message);
		},
		{ onError: (e) => alert(e) }
	);
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
					className={`${
						mutation.isError ? "btn-danger" : "btn-primary" // apply danger class when error
					} group disabled:after:bg-gray-400`}
					disabled={
						mutation.status == "success" ||
						mutation.status == "loading"
					}
					onClick={() => mutation.mutate()}
				>
					<span className="group-disabled:bg-gray-300 group-disabled:text-gray-700">
						{mutation.status == "success" // give text appropriate to mutation status
							? "Added"
							: mutation.status == "loading"
							? "Adding..."
							: mutation.status == "error"
							? "Try again"
							: "Add"}
					</span>
				</button>
			</div>
		</div>
	);
};
export default Book;
