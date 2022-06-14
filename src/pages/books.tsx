import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabaseClient } from "../utils/supabaseClient";
import { book } from "../interfaces";
import Book from "../components/Book";
import { UserContext } from "../components/ContextWrapper";

export default function Books() {
    const [books, setBooks] = useState<Array<book>>([]);
    const context = useContext(UserContext);
    useEffect(() => {
        getBooks(setBooks);
    }, []);
    return (
        <Layout>
            <div>books</div>
            <div>
                {books.map((b) => {
                    return (
                        <Book
                            userId={context?.userData.id!}
                            book={b}
                            key={b.id}
                        />
                    );
                })}
            </div>
        </Layout>
    );
}
// i'm aware that passing setState as a prop outside component may not be the safest way to do this. In this case i don't really see any drawbacks. Other solution would be to create a function inside the component that invokes the function below and sets the state to it's result.
const getBooks = async (setBooks: any) => {
    try {
        const res = await supabaseClient
            .from("books")
            .select("id,title,author,pages,language");

        if (res.error) throw new Error(res.error.message);
        setBooks(res.data!);
    } catch (error) {
        console.log(error);
    }
};
