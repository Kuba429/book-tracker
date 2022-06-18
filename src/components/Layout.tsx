import { useRouter } from "next/router";
import { ScriptProps } from "next/script";
import { useContext, useEffect } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import { UserContext } from "./ContextWrapper";
import Navbar from "./Navbar";

export default function Layout({ children }: ScriptProps) {
    const Router = useRouter();
    const context = useContext(UserContext);
    const getUserData = async () => {
        const user = await supabaseClient.auth.user();
        if (!user) {
            Router.push("/signin");
            return;
        }
        context?.setUserData({ email: user?.email!, id: user?.id! });
    };
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <div className={`md:flex`}>
                <Navbar userMail={context!.userData.email} />
                <main className="w-11/12 mx-auto">{children}</main>
            </div>
        </>
    );
}
