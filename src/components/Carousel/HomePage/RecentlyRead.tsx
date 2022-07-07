import { useQuery } from "react-query";
import Carousel, { Tile } from "..";
import {
	bookResponseToTiles,
	readBookResponseToTiles,
} from "utils/responseToTiles";
import { supabaseClient } from "utils/supabaseClient";
import { book } from "interfaces";
import defaultCover from "utils/defaultCover";

export const RecentlyRead = () => {
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"recently-read-carousel",
		fetcher
	);
	if (status == "success")
		return <Carousel header="Recently read" data={data} />;
	return <p>WORK IN PROGRESS</p>;
};
const fetcher = async () => {
	const res = await supabaseClient
		.from("read_books")
		.select(
			`
				id,
                books (
					id,
                    cover_path
                )
            `
		)
		.limit(23) // 24 with "see more" tile; 24 is divisible by 3, 4 and 8 which are the possible numbers of tiles on screen
		.order("updated_at", { ascending: false });
	if (res.error) throw new Error(res.error.message);
	const tiles = readBookResponseToTiles(res.data);
	return tiles;
};
