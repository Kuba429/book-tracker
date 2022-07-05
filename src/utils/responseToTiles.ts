import { Tile } from "../components/Carousel";
import { book } from "../interfaces";
import defaultCover from "./defaultCover";
import { supabaseClient } from "./supabaseClient";

export const responseToTiles = (data: book[]) => {
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
