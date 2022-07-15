import Layout from "components/Layout";
import { QueryStatusHandler } from "components/pages/books/[id]/QueryStatusHandler";
import { book } from "interfaces";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { supabaseClient } from "utils/supabaseClient";

const BookById = () => {
	// fetch data and set up the page here
	const router = useRouter();
	const { id } = router.query;
	const query = useQuery<book>(["book-by-id", id], () => fetcher(id), {
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

// prop type returned by useRouter.query
const fetcher = async (id: string | string[] | undefined) => {
	if (typeof id !== "string") throw Error("Invalid URL");
	const res = await supabaseClient
		.from("books")
		.select("*")
		.match({ id: id });
	if (res.error) throw new Error(res.error.message);
	return res.data?.at(0);
};
