import { useQuery } from "react-query";
import Carousel, { Tile } from "components/shared/Carousel";
import { readBookResponseToTiles } from "components/shared/Carousel/responseToTiles";
import { supabaseClient } from "supabase/client";
import CarouselSkeleton from "components/shared/Carousel/Skeleton";

export const RecentlyReadCarousel = () => {
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"recently-read-carousel",
		fetcher
	);
	if (status == "success")
		return <Carousel header="Recently read" data={data} />;
	return <CarouselSkeleton header="Loading" />;
};
const fetcher = async () => {
	const userId = supabaseClient.auth.user()?.id;
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
		.eq("user_id", userId)
		.limit(23) // 24 with "see more" tile; 24 is divisible by 3, 4 and 8 which are the possible numbers of tiles on screen
		.order("updated_at", { ascending: false });
	if (res.error) throw new Error(res.error.message);
	const tiles = readBookResponseToTiles(res.data);
	return tiles;
};
