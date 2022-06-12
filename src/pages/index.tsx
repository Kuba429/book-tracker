import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

const Home: NextPage = () => {
    const [userMail, setuserMail] = useState("");
    const getuserMail = async () => {
        const user = await supabaseClient.auth.user();
        if (!user) {
            Router.push("/sign/up");
        }
        setuserMail(user?.email!);
    };
    const handleLogOut = async () => {
        await supabaseClient.auth.signOut();
    };
    useEffect(() => {
        getuserMail();
    }, []);
    return (
        <div>
            <p>{userMail}</p>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    );
};
export async function getServerSideProps() {
    return { props: { test: "test" } };
}
export default Home;
