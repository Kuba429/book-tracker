import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { readBook, readBook as readBookInterface } from "interfaces";
import defaultCover from "supabase/defaultCover";
import {
	ReadBooksAction,
	ReadBooksKind,
} from "utils/hooks/useReadBooksReducer";
import { supabaseClient } from "supabase/client";
import Link from "next/link";
import { useMutation } from "react-query";
import { UserContext } from "components/Layout/ContextWrapper";

const ReadBook: React.FC<{
	readBook: readBookInterface;
	dispatchBooks: Dispatch<ReadBooksAction>;
	setModalState: Dispatch<SetStateAction<boolean | readBook>>;
}> = ({ readBook, setModalState, dispatchBooks }) => {
	const [coverUrl, setCoverUrl] = useState("");
	const context = useContext(UserContext);
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
	const mutation = useMutation(
		async () => {
			const res = await supabaseClient
				.from("read_books")
				.delete()
				.eq("id", readBook.id);
			if (res.error) throw new Error(res.error.message);
		},
		{
			onSuccess: () => {
				dispatchBooks({
					type: ReadBooksKind.REMOVE_BOOK,
					payload: { id: readBook.id },
				});
				context?.setAddedBooksIDs((state) => {
					return state!.filter((x) => x !== readBook.id);
				});
			},
		}
	);
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
					<div>
						<button
							onClick={(e) => {
								e.preventDefault();
								setModalState(readBook);
							}}
							className="btn-primary"
						>
							<span>Update</span>
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								if (
									!confirm(
										`This is going to delete "${readBook.books.title}" from your list along with your progress`
									)
								)
									return;
								mutation.mutate();
							}}
							className="btn-danger"
						>
							<span>
								<FontAwesomeIcon icon={faX} />
							</span>
						</button>
					</div>
				</div>
			</a>
		</Link>
	);
};
export default ReadBook;
