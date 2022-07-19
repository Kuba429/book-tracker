import { supabaseClient } from "supabase/client";

export const fetchBooks = async () => {
	const userId = await supabaseClient.auth.user()?.id;
	const res = await supabaseClient
		.from("books")
		.select("id,title,author,pages,language,cover_path")
		.or(`added_by.eq.${userId},approved.eq.true`);
	if (res.error) throw new Error(res.error.message);
	return res.data;
};
