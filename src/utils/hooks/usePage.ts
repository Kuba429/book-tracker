import { useState } from "react";

export const usePage = (
	dataLength: number
): [number, () => void, () => void] => {
	const [page, setPage] = useState(0);
	const getMaxPage = () => {
		// this function must be called on every update; other solution would be to add listener to the resize event but i don't think it's necessary now, might do it later if performance is bad
		const tileWidthRaw = getComputedStyle(
			document.documentElement
		).getPropertyValue("--tile-width"); // variable dependant on css media query based on tailwind breakpoint
		const tileWidth: number = parseInt(tileWidthRaw) / 100;
		return Math.ceil(dataLength * tileWidth);
	};
	const moveForward = () => {
		setPage((x) => (x + 1) % getMaxPage());
	};
	const moveBack = () => {
		const maxPage = getMaxPage();
		setPage((x) => (x + maxPage - 1) % maxPage);
	};
	return [page, moveForward, moveBack];
};
