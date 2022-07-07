import type { NextPage } from "next";
import { RecentlyAddedCarousel } from "components/Carousel/HomePage/RecentlyAdded";
import Layout from "components/Layout";
import { RecentlyRead } from "components/Carousel/HomePage/RecentlyRead";

const Home: NextPage = () => {
	return (
		<Layout>
			<header className="page-header">
				<h1>Home</h1>
			</header>
			<RecentlyAddedCarousel />
			<RecentlyRead />
		</Layout>
	);
};
export default Home;
