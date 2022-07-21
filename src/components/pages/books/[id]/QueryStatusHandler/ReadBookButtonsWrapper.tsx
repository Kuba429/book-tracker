import UpdateProgressModal from "components/pages/mylist/ReadBook/UpdateProgressModal";
import ReadBookButtons from "components/shared/ReadBookButtons";
import { readBook } from "interfaces";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { supabaseClient } from "supabase/client";

const ReadBookButtonsWrapper: FC<{ bookID: string }> = ({ bookID }) => {
	const [modalState, setModalState] = useState<boolean | readBook>(false);
	const { data, isSuccess, status } = useQuery<readBook>(
		["specific-book-by-id", bookID],
		async () => {
			const userID = supabaseClient.auth.user()?.id;
			const res = await supabaseClient
				.from("read_books")
				.select("*, books(*)")
				.eq("book_id", bookID)
				.eq("user_id", userID)
				.maybeSingle();

			if (res.error) throw new Error(res.error.message);
			return res.data;
		}
	);
	return (
		<>
			{isSuccess && data && (
				<ReadBookButtons
					setModalState={setModalState}
					readBook={data as readBook}
				/>
			)}
			{modalState && (
				<UpdateProgressModal
					modalState={modalState as readBook}
					setModalState={setModalState}
				/>
			)}
		</>
	);
};
export default ReadBookButtonsWrapper;
