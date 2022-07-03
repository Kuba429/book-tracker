import React, { useReducer } from "react";
import defaultCover from "../../utils/defaultCover";
interface Tile {
	url: string;
	id: number;
}
const MAX_PAGES = 5;

const reducer = (state: number, action: { type: "ADD" | "SUBTRACT" }) => {
	switch (action.type) {
		case "ADD":
			return (state + 1) % MAX_PAGES;
		case "SUBTRACT":
			// nothing meaningful; easiest formula for subtracting i could come up with not using any conditional statements (and obviously taking max pages into account)
			return (state + MAX_PAGES - 1) % MAX_PAGES;
	}
	return state;
};
const Carousel = () => {
	let data: Array<Tile> = [];
	for (let i = 0; i < 20; i++) data.push({ url: defaultCover!, id: i });
	const [state, dispatch] = useReducer(reducer, 0);

	return (
		<div
			id="wrapper"
			className="relative w-full min-w-full overflow-hidden p-5"
		>
			<button
				onClick={() => dispatch({ type: "SUBTRACT" })}
				className="absolute z-10 left-1 top-1/2 bg-light-800"
			>
				⬅
			</button>
			<div
				className={`w-full flex bg-red-600 transition-all`}
				style={{ transform: `translateX(${state * -100}%)` }}
				id="carousel"
			>
				{data.map((x) => (
					<Tile data={x} key={x.id} page={state} />
				))}
			</div>
			<button
				onClick={() => dispatch({ type: "ADD" })}
				className="absolute z-10 right-0 top-1/2 bg-light-800"
			>
				➡
			</button>
		</div>
	);
};
export default Carousel;

const Tile: React.FC<{ data: Tile; page: number }> = ({ data, page }) => {
	return (
		<div className="w-1/3 md:w-1/4 p-1 bg-dark-200 flex-shrink-0 flex-grow-0">
			<img
				className="object-contain m-auto w-24 h-36"
				src={data.url}
				alt={data.id as unknown as string}
			/>
		</div>
	);
};
