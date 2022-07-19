import { supabaseClient } from "supabase/client";

export const fetchByQuery = async (
	table: string,
	query: string,
	eq: [string, string] = ["", ""]
) => {
	const res = await supabaseClient.from(table).select(query).eq(eq[0], eq[1]);
	if (res.error) throw new Error(res.error.message);
	return res.data;
};
