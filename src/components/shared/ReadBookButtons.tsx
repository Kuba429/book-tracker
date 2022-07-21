import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "components/Layout/ContextWrapper";
import { readBook } from "interfaces";
import { Dispatch, SetStateAction, useContext } from "react";
import { useMutation } from "react-query";
import { supabaseClient } from "supabase/client";
import {
	ReadBooksAction,
	ReadBooksKind,
} from "utils/hooks/useReadBooksReducer";
import { readBook as readBookInterface } from "interfaces";
const ReadBookButtons: React.FC<{
	readBook: readBookInterface;
	dispatchBooks?: Dispatch<ReadBooksAction>;
	setModalState: Dispatch<SetStateAction<boolean | readBook>>;
}> = ({ readBook, setModalState, dispatchBooks }) => {
	const context = useContext(UserContext);
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
				dispatchBooks &&
					dispatchBooks({
						type: ReadBooksKind.REMOVE_BOOK,
						payload: { id: readBook.id },
					});
				context?.setAddedBooksIDs((state) => {
					return state!.filter((x) => x !== readBook.books.id);
				});
			},
		}
	);
	return (
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
	);
};

export default ReadBookButtons;
