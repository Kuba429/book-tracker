import React, { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { readBook } from "interfaces";
import {
	ReadBooksAction,
	ReadBooksKind,
} from "utils/hooks/useReadBooksReducer";
import { supabaseClient } from "supabase/client";

const UpdateProgressModal: React.FC<{
	setModalState: Dispatch<SetStateAction<readBook | boolean>>;
	modalState: readBook;
	dispatchBooks?: Dispatch<ReadBooksAction>;
}> = ({ setModalState, modalState, dispatchBooks }) => {
	const [newPage, setNewPage] = useState(modalState.last_read_page);
	const mutation = useMutation(
		async (newLastPageRead: number) => {
			const res = await supabaseClient
				.from("read_books")
				.update({
					last_read_page: newLastPageRead,
					updated_at: new Date().toISOString(),
				})
				.eq("id", modalState.id);
			if (res.error) throw new Error(res.error.message);
		},
		{
			onSuccess(data, variables, context) {
				dispatchBooks &&
					dispatchBooks({
						// update read books state to display updated progress without refetching
						type: ReadBooksKind.UPDATE_PROGRESS,
						payload: { id: modalState.id, lastReadPage: variables },
					});
				setModalState(false);
			},
		}
	);
	return (
		<>
			{/* Dim the space behind the modal and make modal disappear on click */}
			{/* Modal itself can't be a child of element below because click on modal would trigger event listener and update state */}
			<div
				onClick={() => setModalState(false)}
				className={`h-full w-full absolute z-30 top-0 left-0 
                dark:bg-dark-800 bg-light-800 opacity-70`}
			></div>
			<form
				className={`absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-11/12 sm:w-auto
                border-2 rounded
                bg-light-800 dark:bg-dark-800 text-dark-800 dark:text-white
                border-light-700 dark:border-dark-700
                flex flex-col p-4 gap-4
                `}
				onSubmit={(e) => {
					e.preventDefault();
					mutation.mutate(newPage);
				}}
			>
				<h1 className="text-3xl leading-8">
					Update your progress
					<br />
					<span className="text-base">{modalState.books.title}</span>
				</h1>

				<input
					value={newPage}
					onInput={(e) => {
						setNewPage(
							parseInt((e.target as HTMLInputElement).value)
						);
					}}
					type="range"
					min={0}
					max={modalState.books.pages}
				/>
				<input
					type="number"
					value={newPage}
					min={0}
					max={modalState.books.pages}
					onInput={(e) => {
						setNewPage(
							parseInt((e.target as HTMLInputElement).value)
						);
					}}
				/>
				<button
					disabled={mutation.isLoading}
					className="btn-primary group disabled:after:bg-gray-400"
					type="submit"
				>
					<span className="group-disabled:bg-gray-300 group-disabled:text-gray-700">
						{mutation.isLoading ? "Updating..." : "Update"}
					</span>
				</button>
			</form>
		</>
	);
};
export default UpdateProgressModal;
