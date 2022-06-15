import { FormEvent } from "react";
import Layout from "../../components/Layout";
import Compress from "compress.js";
import { supabaseClient } from "../../utils/supabaseClient";
import path from "path";
const Add = () => {
    return (
        <Layout>
            <form onSubmit={formHandler} className="flex flex-col">
                <input
                    required
                    type="text"
                    name="title"
                    className="m-1 border"
                />
                <input required type="file" name="cover" />
                <button type="submit">Submit</button>
            </form>
        </Layout>
    );
};
export default Add;
const compress = new Compress();
const formHandler = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const image: File = formData.get("cover") as File;
    compress
        .compress([image], {
            size: 0.01, // 10KB
            resize: true,
            maxHeight: 560,
            maxWidth: 800,
        })
        .then(async (res) => {
            const base64 = res[0].data;
            const imgExt = res[0].ext;
            const blob = Compress.convertBase64ToFile(base64, imgExt);
            const file = new File([blob], "book-cover");
            // const dbRes = await supabaseClient.storage
            //     .from("covers")
            //     .upload("/test.png", file);
            // console.log(dbRes);

            // check
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let url = reader.result;
                // just testing
                // const tempImg = new Image();
                // tempImg.src = url as string;
                // document.body.appendChild(tempImg);
            };
        });
};
