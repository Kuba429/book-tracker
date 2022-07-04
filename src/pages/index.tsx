import type { NextPage } from "next";
import { useQuery } from "react-query";
import Carousel, { Tile } from "../components/Carousel";
import Layout from "../components/Layout";
import { book } from "../interfaces";
import defaultCover from "../utils/defaultCover";
import { supabaseClient } from "../utils/supabaseClient";

const Home: NextPage = () => {
	return (
		<Layout>
			<header className="page-header">
				<h1>Home</h1>
			</header>
			<RecentlyAddedCarousel />
		</Layout>
	);
};
export default Home;

const RecentlyAddedCarousel = () => {
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"most-popular-carousel",
		async () => {
			const res = await supabaseClient
				.from("books")
				.select("id,cover_path")
				.limit(23) // 24 with "see more" tile; 24 is divisible by 3, 4 and 8 which are the possible numbers of tiles on screen
				.order("created_at", { ascending: false });
			if (res.error) throw new Error(res.error.message);
			const tiles = responseToTiles(res.data);
			return tiles;
		}
	);
	if (status == "success") return <Carousel data={data} />;
	return <p>WORK IN PROGRESS</p>;
};

const responseToTiles = (data: book[]) => {
	const tiles: Array<Tile> = [];
	data.forEach(async (row: book) => {
		const newTile: Tile = {
			imgUrl:
				supabaseClient.storage
					.from("covers")
					.getPublicUrl(row.cover_path).data?.publicURL ??
				defaultCover!,
			id: row.id as unknown as number,
		};
		tiles.push(newTile);
	});
	return tiles;
};
