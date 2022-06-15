import { FormEvent } from "react";
import Layout from "../../components/Layout";
import Compress from "compress.js";
import { supabaseClient } from "../../utils/supabaseClient";
import path from "path";
import { v4 } from "uuid";
const Add = () => {
    return (
        <Layout>
            <form onSubmit={formHandler} className="flex flex-col">
                <input
                    required
                    type="text"
                    placeholder="title"
                    name="title"
                    className="m-1 border"
                />
                <input
                    required
                    type="text"
                    placeholder="author"
                    name="author"
                />
                <input type="number" placeholder="pages" name="pages" />
                <input type="text" placeholder="language" name="language" />
                <input required type="file" placeholder="cover" name="cover" />
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
};
export default Add;
const compress = new Compress();

const formHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const image: File = formData.get("cover") as File;
    const title: string = formData.get("title") as string;
    const author: string = formData.get("author") as string;
    const pages: string = formData.get("pages") as string;
    const language: string = formData.get("language") as string;

    try {
        const coverPath: string = await uploadToBucket(image);
        console.log("Image uploaded to bucket");
        const res = await supabaseClient.from("books").insert([
            {
                title,
                author,
                pages: parseInt(pages),
                language,
                cover_path: coverPath,
            },
        ]);
        if (res.error) throw new Error(res.error.message);
    } catch (error) {
        console.error(error);
    }
};

const uploadToBucket = async (image: File): Promise<string> => {
    // compress the image
    const compressed = await compress.compress([image], {
        size: 0.01, // 10KB
        resize: true,
        maxHeight: 560 / 4,
        maxWidth: 800 / 4,
    });
    const base64 = compressed[0].data;
    const imgExt = compressed[0].ext;
    // turn compressed image from base64 back to binary
    const blob = Compress.convertBase64ToFile(base64, imgExt);
    const file = new File([blob], "book-cover"); // compressed file ready to upload
    const id = v4(); // name of the file in supabase storage bucket
    const res = await supabaseClient.storage.from("covers").upload(id, file);
    if (res.error) throw new Error(res.error.message);
    return id;
};
