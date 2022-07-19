import { book } from "interfaces";
import { FC } from "react";
import { useMutation } from "react-query";
import { supabaseClient } from "supabase/client";

export const AddButton: FC<{
	book: book;
	userId: string;
	customClass?: string;
	customSpanClass?: string;
}> = ({ book, userId, customClass, customSpanClass }) => {
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
		<button
			className={`${
				mutation.isError ? "btn-danger" : "btn-primary" // apply danger class when error
			}
				group disabled:after:bg-gray-400
				${
					// add custom class if passed in props
					customClass ? customClass : ""
				}

				`}
			disabled={
				mutation.status == "success" || mutation.status == "loading"
			}
			onClick={(e) => {
				e.preventDefault(); // this button may be nested inside a link
				mutation.mutate();
			}}
		>
			<span
				className={`group-disabled:bg-gray-300 group-disabled:text-gray-700
					${
						// add custom class if passed in props
						customSpanClass ? customSpanClass : ""
					}
				`}
			>
				{mutation.status == "success" // give text appropriate to mutation status
					? "Added"
					: mutation.status == "loading"
					? "Adding..."
					: mutation.status == "error"
					? "Try again"
					: "Add"}
			</span>
		</button>
	);
};
