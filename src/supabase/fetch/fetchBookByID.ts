import { supabaseClient } from "supabase/client";

// prop type returned by useRouter.query
export const fetchBooksByID = async (id: string | string[] | undefined) => {
	if (typeof id !== "string") throw Error("Invalid URL");
	const res = await supabaseClient
		.from("books")
		.select("*")
		.match({ id: id });
	if (res.error) throw new Error(res.error.message);
	return res.data?.at(0);
};
