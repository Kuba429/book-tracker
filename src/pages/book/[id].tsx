import Layout from "components/Layout";
import { book } from "interfaces";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { supabaseClient } from "utils/supabaseClient";

const BookById = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, status, error } = useQuery<book>(
		["book-by-id", id],
		() => fetcher(id),
		{ enabled: router.isReady }
	);
	return (
		<Layout>
			<header className="page-header">
				<h1>{data?.title}</h1>
			</header>
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
