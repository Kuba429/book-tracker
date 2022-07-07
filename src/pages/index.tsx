import type { NextPage } from "next";
import { RecentlyAddedCarousel } from "components/Carousel/HomePage/RecentlyAdded";
import Layout from "components/Layout";
import { RecentlyReadCarousel } from "components/Carousel/HomePage/RecentlyRead";
import { MostPopularCarousel } from "components/Carousel/HomePage/MostPopular";

const Home: NextPage = () => {
	return (
		<Layout>
			<header className="page-header">
				<h1>Home</h1>
			</header>
			<MostPopularCarousel />
			<RecentlyAddedCarousel />
			<RecentlyReadCarousel />
		</Layout>
	);
};
export default Home;
