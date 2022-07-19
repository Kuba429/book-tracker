import { Tile } from "components/shared/Carousel";
import { book, readBook } from "interfaces";
import { v4 } from "uuid";
import defaultCover from "supabase/defaultCover";
import { supabaseClient } from "supabase/client";

export const bookResponseToTiles = (data: book[]) => {
	// response from "books" table
	const tiles: Array<Tile> = [];
	data.forEach(async (row: book) => {
		const newTile: Tile = {
			imgUrl:
				supabaseClient.storage
					.from("covers")
					.getPublicUrl(row.cover_path).data?.publicURL ??
				defaultCover!,
			id: row.id as unknown as number,
			uuid: v4(),
		};
		tiles.push(newTile);
	});
	return tiles;
};

export const readBookResponseToTiles = (data: readBook[]) => {
	// response from "read_books" table
	const tiles: Array<Tile> = [];
	data.forEach(async (row: readBook) => {
		const newTile: Tile = {
			imgUrl:
				supabaseClient.storage
					.from("covers")
					.getPublicUrl(row.books.cover_path).data?.publicURL ??
				defaultCover!,
			id: row.books.id as unknown as number,
			uuid: v4(),
		};
		tiles.push(newTile);
	});
	return tiles;
};
