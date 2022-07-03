import type { NextPage } from "next";
import Carousel from "../components/Carousel";
import Layout from "../components/Layout";

const Home: NextPage = () => {
	return (
		<Layout>
			<header className="page-header">
				<h1>Home</h1>
			</header>
			<Carousel />
		</Layout>
	);
};
export default Home;
