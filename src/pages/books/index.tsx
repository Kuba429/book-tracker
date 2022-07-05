import React, { useContext, useEffect } from "react";
import Layout from "components/Layout";
import { supabaseClient } from "utils/supabaseClient";
import { book } from "interfaces";
import Book from "components/Book";
import { UserContext } from "components/ContextWrapper";
import Link from "next/link";
import { useQuery } from "react-query";

export default function Books() {
	return (
		<Layout>
			<header className="page-header">
				<h1>Books</h1>
				<button className="btn-primary self-center">
					<Link href="/books/add">
						<a>Add more books</a>
					</Link>
				</button>
			</header>
			<BooksContainer />
		</Layout>
	);
}
const BooksContainer = () => {
	const context = useContext(UserContext);
	const { isLoading, isError, data, error } = useQuery<Array<book>, Error>(
		"books",
		async () => {
			const userId = await supabaseClient.auth.user()?.id;
			const res = await supabaseClient
				.from("books")
				.select("id,title,author,pages,language,cover_path")
				.or(`added_by.eq.${userId},approved.eq.true`);
			if (res.error) throw new Error(res.error.message);
			return res.data;
		}
	);
	if (isLoading)
		return (
			<h1 className="text-4xl text-dark-800 dark:text-white">Loading</h1>
		);
	if (isError)
		return (
			<h2 className="text-3xl">
				sorry, there was an error {error?.message}
			</h2>
		);
	return (
		<div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2">
			{data!.map((b) => {
				return (
					<Book userId={context?.userData.id!} book={b} key={b.id} />
				);
			})}
		</div>
	);
};
