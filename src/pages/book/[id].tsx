import Layout from "components/Layout";
import { book } from "interfaces";
import { useRouter } from "next/router";
import { FC } from "react";
import { useQuery, UseQueryResult } from "react-query";
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
			<NestedWrapper query={query} />
			{/* Don't want layout to rerender */}
		</Layout>
	);
};
export default BookById;

const NestedWrapper: FC<{ query: UseQueryResult<book> }> = ({ query }) => {
	// decide what to render here
	switch (query.status) {
		case "success":
			return <NestedOnSuccess data={query.data} />;
		case "loading":
			return <NestedOnLoading />;
		case "error":
			return <NestedOnError error={query.error} />;
	}
	return <h1>TODO FIX ME</h1>;
};

const NestedOnSuccess: FC<{ data: book }> = ({ data }) => {
	return (
		<>
			<header className="page-header">
				<h1>{data.title}</h1>
			</header>
		</>
	);
};
const NestedOnLoading = () => {
	// TODO: skeleton loading!!!!!!!!!!
	return (
		<>
			<header className="page-header">
				<h1>waiting</h1>
			</header>
		</>
	);
};
const NestedOnError: FC<{ error: unknown }> = ({ error }) => {
	console.log(error);
	return (
		<>
			<header className="page-header">
				<h1>error</h1>
			</header>
		</>
	);
};
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
