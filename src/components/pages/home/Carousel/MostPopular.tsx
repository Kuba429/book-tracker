import { useQuery } from "react-query";
import Carousel, { Tile } from "components/shared/Carousel";
import { bookResponseToTiles } from "components/shared/Carousel/responseToTiles";
import { supabaseClient } from "supabase/client";

export const MostPopularCarousel = () => {
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"most-popular-carousel",
		fetcher
	);
	if (status == "success")
		return <Carousel header="Most popular" data={data} />;
	return <p>WORK IN PROGRESS</p>;
};
const fetcher = async () => {
	const res = await supabaseClient.rpc("getbooksbycount"); // call postgres function via supabase rpc; the function returns id, cover_path and count (how many times it appears in the table) of every book in read_books table
	if (res.error) throw new Error(res.error.message);
	const tiles = bookResponseToTiles(
		res.data.sort((a, b) => b.count_books - a.count_books) // sort before passing as prop
	);
	return tiles;
};
