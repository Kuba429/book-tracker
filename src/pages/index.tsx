import type { NextPage } from "next";
import { RecentlyAddedCarousel } from "components/pages/home/Carousel/RecentlyAdded";
import Layout from "components/Layout";
import { RecentlyReadCarousel } from "components/pages/home/Carousel/RecentlyRead";
import { MostPopularCarousel } from "components/pages/home/Carousel/MostPopular";

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
