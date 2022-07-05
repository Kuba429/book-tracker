import { useQuery } from "react-query";
import Carousel, { Tile } from "..";
import { responseToTiles } from "utils/responseToTiles";
import { supabaseClient } from "utils/supabaseClient";

export const RecentlyAddedCarousel = () => {
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"most-popular-carousel",
		fetcher
	);
	if (status == "success") return <Carousel data={data} />;
	return <p>WORK IN PROGRESS</p>;
};
const fetcher = async () => {
	const res = await supabaseClient
		.from("books")
		.select("id,cover_path")
		.limit(23) // 24 with "see more" tile; 24 is divisible by 3, 4 and 8 which are the possible numbers of tiles on screen
		.order("created_at", { ascending: false });
	if (res.error) throw new Error(res.error.message);
	const tiles = responseToTiles(res.data);
	return tiles;
};
