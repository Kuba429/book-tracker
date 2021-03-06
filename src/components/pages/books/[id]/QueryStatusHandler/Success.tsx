import { UserContext } from "components/Layout/ContextWrapper";
import { AddButton } from "components/shared/AddButton";
import { book } from "interfaces";
import { FC, useContext, useEffect } from "react";
import defaultCover from "supabase/defaultCover";
import { supabaseClient } from "supabase/client";
import ReadBookButtons from "components/shared/ReadBookButtons";
import ReadBookButtonsWrapper from "./ReadBookButtonsWrapper";

export const Success: FC<{ data: book }> = ({ data }) => {
	const coverUrl = supabaseClient.storage
		.from("covers")
		.getPublicUrl(data.cover_path).data?.publicURL;
	const context = useContext(UserContext);
	useEffect(() => {
		context?.refetchReadIDs();
	}, []);
	return (
		<>
			<header className="page-header">
				<h1>{data.title}</h1>
			</header>
			<div className="sm:flex w-full justify-evenly gap-2">
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
					{(context?.addedBooksIDs || []).includes(
						data.id.toString()
					) ? (
						data && <ReadBookButtonsWrapper bookID={data.id} />
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
