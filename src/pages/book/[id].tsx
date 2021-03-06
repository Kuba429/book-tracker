import Layout from "components/Layout";
import { QueryStatusHandler } from "components/pages/books/[id]/QueryStatusHandler";
import { book } from "interfaces";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { fetchBooksByID } from "supabase/fetch/fetchBookByID";

const BookById = () => {
	// fetch data and set up the page here
	const router = useRouter();
	const { id } = router.query;
	const query = useQuery<book>(["book-by-id", id], () => fetchBooksByID(id), {
		enabled: router.isReady,
	});
	return (
		<Layout>
			<QueryStatusHandler query={query} />
			{/* Don't want layout to rerender */}
		</Layout>
	);
};
export default BookById;
