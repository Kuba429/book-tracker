import React, { useContext } from "react";
import Layout from "components/Layout";
import { book } from "interfaces";
import Book from "components/pages/books/index/Book";
import { UserContext } from "components/Layout/ContextWrapper";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchBooks } from "supabase/fetch/fetchBooks";

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
		fetchBooks
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
