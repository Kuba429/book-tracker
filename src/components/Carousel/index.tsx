import React from "react";
import defaultCover from "../../utils/defaultCover";
import { usePage } from "../../utils/hooks/usePage";
interface Tile {
	url: string;
	id: number;
}
const Carousel = () => {
	let data: Array<Tile> = [];
	for (let i = 0; i < 20; i++) data.push({ url: defaultCover!, id: i });
	///////////////////////// dummy data above
	const [page, addPage, subtractPage] = usePage(data.length);
	return (
		<div className="carousel">
			<button onClick={subtractPage} className="buttonLeft">
				⬅
			</button>
			<div
				className="track"
				style={{ transform: `translateX(${page * -100}%)` }}
			>
				{data.map((x) => (
					<Tile data={x} key={x.id} page={page} />
				))}
			</div>
			<button onClick={addPage} className="buttonRight">
				➡
			</button>
		</div>
	);
};
export default Carousel;

const Tile: React.FC<{ data: Tile; page: number }> = ({ data, page }) => {
	return (
		<div className="tile">
			<img
				className="object-contain m-auto w-24 h-36"
				src={data.url}
				alt={data.id as unknown as string}
			/>
		</div>
	);
};
