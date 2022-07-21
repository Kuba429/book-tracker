import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { readBook, readBook as readBookInterface } from "interfaces";
import defaultCover from "supabase/defaultCover";
import { ReadBooksAction } from "utils/hooks/useReadBooksReducer";
import { supabaseClient } from "supabase/client";
import Link from "next/link";
import ReadBookButtons from "components/shared/ReadBookButtons";

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
	}, [readBook]);

	return (
		<Link href={`/book/${readBook.books.id}`}>
			<a key={readBook.books.id} className="book-card">
				<img
					className="object-contain w-24 h-36"
					src={coverUrl}
					alt="Book cover"
				/>
				<div>
					<p>{readBook.books.title}</p>
					<p>{readBook.books.author}</p>
					<p>last read page: {readBook.last_read_page}</p>
					<ReadBookButtons
						readBook={readBook}
						dispatchBooks={dispatchBooks}
						setModalState={setModalState}
					/>
				</div>
			</a>
		</Link>
	);
};
export default ReadBook;
