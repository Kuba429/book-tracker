import { useRouter } from "next/router";
import { ScriptProps } from "next/script";
import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import Navbar from "./Navbar";

export default function Layout({ children }: ScriptProps) {
    const Router = useRouter();
    const [userMail, setUserMail] = useState("");
    const getuserMail = async () => {
        const user = await supabaseClient.auth.user();
        if (!user) {
            Router.push("/signin");
        }
        setUserMail(user?.email!);
    };
    useEffect(() => {
        getuserMail();
    }, []);
    return (
        <main>
            <Navbar userMail={userMail} />
            {children}
        </main>
    );
}
