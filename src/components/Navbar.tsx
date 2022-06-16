import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

const Navbar: React.FC<{ userMail: string }> = ({ userMail }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();
    const handleSignOut = async () => {
        const res = await supabaseClient.auth.signOut();
        router.push("/signin");
    };
    return (
        <>
            <div
                className={`bg-slate-800 text-white py-3
                md:hidden`}
            >
                <button onClick={() => setIsVisible((x) => !x)}>toggle</button>
            </div>
            <div
                className={`w-80 h-full overflow-y-auto text-white bg-slate-800 flex flex-col items-start gap-4 justify-start py-10 px-10 transition-all
                absolute md:static 
                ${!isVisible && "-translate-x-full"} 
                md:translate-x-0
                `}
            >
                <button
                    className="md:hidden"
                    onClick={() => {
                        setIsVisible(false);
                    }}
                >
                    toggle
                </button>
                <h1 className="text-3xl">Book Tracker</h1>
                <Link href={"/"}>
                    <a>Home</a>
                </Link>
                <Link href={"/books"}>
                    <a>Books</a>
                </Link>
                <Link href="/mylist">
                    <a>My list</a>
                </Link>
                <span>{userMail}</span>
                <button onClick={handleSignOut}>Sing out</button>
            </div>
        </>
    );
};

export default Navbar;
