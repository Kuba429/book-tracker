import { AddButton } from "components/AddButton";
import { UserContext } from "components/ContextWrapper";
import Layout from "components/Layout";
import { book } from "interfaces";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";
import defaultCover from "utils/defaultCover";
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
	const coverUrl = supabaseClient.storage
		.from("covers")
		.getPublicUrl(data.cover_path).data?.publicURL;
	const context = useContext(UserContext);
	return (
		<>
			<header className="page-header">
				<h1>{data.title}</h1>
			</header>
			<div className="sm:flex w-full gap-2">
				<img
					className="object-contain max-h-screen w-full m-auto sm:h-auto sm:w-80 sm:m-0"
					src={coverUrl || defaultCover}
				/>
				<div className="text-lg flex flex-col justify-between">
					<p className="mb-5">
						<span className="text-dimmed-always"> Title:</span>{" "}
						{data.title} <br />
						<span className="text-dimmed-always">Author:</span>{" "}
						{data.author} <br />
						<span className="text-dimmed-always"> Pages:</span>{" "}
						{data.pages} <br />
					</p>
					{(context?.addedBooksIds || []).includes(
						data.id.toString()
					) ? (
						<button
							disabled
							className="mb-2 btn group disabled:after:bg-gray-400
						"
						>
							<span className="w-full group-disabled:bg-gray-300 group-disabled:text-gray-700">
								Added
							</span>
						</button>
					) : (
						<AddButton
							userId={context?.userData.id!} // at this point user would have been redirected to login screen if they hadn't been logged in
							book={data}
							customClass="mb-2"
							customSpanClass="w-full"
						/>
					)}
				</div>
			</div>
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
