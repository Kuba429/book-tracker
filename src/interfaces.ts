export interface book {
    id: string;
    title: string;
    author: string;
    pages: number;
    language: string;
    cover_path: string;
}
export interface bookRead {
    id: string;
    lastReadPage: number;
    books: book; // books not book because that's how it's called in db
}
export interface userDataInterface {
    id: string;
    email: string;
}
