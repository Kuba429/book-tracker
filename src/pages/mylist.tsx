import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReadBook from "components/ReadBook";
import UpdateProgressModal from "components/ReadBook/UpdateProgressModal";
import Layout from "components/Layout";
import { readBook } from "interfaces";
import {
	ReadBooksAction,
	ReadBooksKind,
	useReadBooksReducer,
} from "utils/hooks/useReadBooksReducer";
import { supabaseClient } from "utils/supabaseClient";
import { useQuery } from "react-query";

export default function List() {
	const [books, dispatchBooks] = useReadBooksReducer();
	const [modalState, setModalState] = useState<boolean | readBook>(false);
	return (
		<Layout>
			<header className="page-header">
				<h1>My List</h1>
			</header>
			<ReadBooksContainer
				books={books}
				dispatchBooks={dispatchBooks}
				setModalState={setModalState}
			/>
			{modalState && (
				<UpdateProgressModal
					modalState={modalState as readBook} // at this point modalState is bound to not be false (therefore not a bool since true is never assigned to it)
					setModalState={setModalState}
					dispatchBooks={dispatchBooks}
				/>
			)}
		</Layout>
	);
}

const ReadBooksContainer: React.FC<{
	books: Array<readBook>;
	dispatchBooks: Dispatch<ReadBooksAction>;
	setModalState: Dispatch<SetStateAction<boolean | readBook>>;
}> = ({ books, dispatchBooks, setModalState }) => {
	const { data, status, error } = useQuery<Array<readBook>, Error>(
		"read_books",
		fetchReadBooks
	);
	useEffect(() => {
		data &&
			dispatchBooks({
				type: ReadBooksKind.SET_BOOKS,
				payload: { books: data },
			});
	}, [data]);
	switch (status) {
		case "loading":
			return (
				<h1 className="text-4xl text-dark-800 dark:text-white">
					Loading
				</h1>
			);
		case "error":
			return (
				<h2 className="text-3xl">
					sorry, there was an error {error?.message}
				</h2>
			);
		default:
			if (books.length > 0) {
				return (
					<div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2">
						{books.length > 0 &&
							books.map((b) => {
								return (
									<ReadBook
										readBook={b}
										setModalState={setModalState}
										dispatchBooks={dispatchBooks}
										key={b.id}
									/>
								);
							})}
					</div>
				);
			} else {
				return (
					<p className="w-full text-center text-dark-800 dark:text-white">
						You haven't added any books yet. Any books you decide to
						add will appear here!
					</p>
				);
			}
	}
};
const fetchReadBooks = async () => {
	const res = await supabaseClient
		.from("read_books")
		.select(
			`
                last_read_page,
                id,
                books (
                    *
                )
            `
		)
		.order("updated_at", { ascending: false });
	if (res.error) throw new Error(res.error.message);
	return res.data;
};
