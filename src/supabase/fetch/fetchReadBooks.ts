import { supabaseClient } from "supabase/client";
export const fetchReadBooks = async () => {
	const userId = await supabaseClient.auth.user()?.id;
	const res = await supabaseClient
		.from("read_books")
		.select(
			`
                last_read_page,
                id,
                books (
                    *
                )
            `
		)
		.eq("user_id", userId)
		.order("updated_at", { ascending: false });
	if (res.error) throw new Error(res.error.message);
	return res.data;
};
