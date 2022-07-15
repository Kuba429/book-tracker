import React, { useEffect, useState } from "react";
import { book as bookInterface } from "interfaces";
import defaultCover from "utils/defaultCover";
import { supabaseClient } from "utils/supabaseClient";
import { AddButton } from "../../shared/AddButton";

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
	}, [book]);
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
				<AddButton book={book} userId={userId} />
			</div>
		</div>
	);
};
export default Book;
