import { useQuery } from "react-query";
import Carousel, { Tile } from "components/shared/Carousel";
import { bookResponseToTiles } from "components/shared/Carousel/responseToTiles";
import { supabaseClient } from "supabase/client";
import CarouselSkeleton from "components/shared/Carousel/Skeleton";

export const RecentlyAddedCarousel = () => {
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"recently-added-carousel",
		fetcher
	);
	if (status == "success")
		return <Carousel header="Recently added" data={data} />;
	return <CarouselSkeleton header="Loading" />;
};
const fetcher = async () => {
	const res = await supabaseClient
		.from("books")
		.select("id,cover_path")
		.limit(23) // 24 with "see more" tile; 24 is divisible by 3, 4 and 8 which are the possible numbers of tiles on screen
		.order("created_at", { ascending: false });
	if (res.error) throw new Error(res.error.message);
	const tiles = bookResponseToTiles(res.data);
	return tiles;
};
