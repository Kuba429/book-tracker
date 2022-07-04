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
			<MostPopularCarousel />
		</Layout>
	);
};
export default Home;

const MostPopularCarousel = () => {
	// let data: Array<Tile> = [];
	// for (let i = 0; i < 20; i++) data.push({ imgUrl: defaultCover!, id: i });
	const { data, status, error } = useQuery<Array<Tile>, Error>(
		"most-popular-carousel",
		async () => {
			const tiles: Array<Tile> = [];
			const res = await supabaseClient
				.from("books")
				.select("id,cover_path");
			if (res.error) throw new Error(res.error.message);
			// form objects of proper type below; also get covers
			res.data.forEach(async (row: book) => {
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
		}
	);
	if (status == "success") return <Carousel data={data} />;
	return <p>WORK IN PROGRESS</p>;
};
