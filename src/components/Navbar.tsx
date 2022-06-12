import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

const Navbar: React.FC<{ userMail: string }> = ({ userMail }) => {
    const router = useRouter();
    const handleSignOut = async () => {
        const res = await supabaseClient.auth.signOut();
        router.push("/signin");
    };
    return (
        <div className="w-full bg-slate-800 p-4 text-white flex justify-between">
            <span>Booktracker</span>
            <span className="relative cursor-pointer group">
                {userMail}
                <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
                <span
                    onClick={handleSignOut}
                    className={
                        "absolute right-0 top-0 bg-slate-700 translate-y-full text-white mx-1 rounded p-1 text-sm cursor-pointer invisible delay-500 group-hover:delay-75 group-hover:visible"
                    }
                >
                    Sign Out
                </span>
            </span>
        </div>
    );
};

export default Navbar;
