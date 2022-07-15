export interface book {
	id: string;
	title: string;
	author: string;
	pages: number;
	language: string;
	cover_path: string;
}
export interface readBook {
	id: string;
	last_read_page: number;
	books: book; // books not book because that's how it's called in db
}
export interface userDataInterface {
	id: string; // TODO fix!!! id is possibly number not string!!!!!!!!!!!!!
	email: string;
}
