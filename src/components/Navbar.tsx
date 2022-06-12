import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScriptProps } from "next/script";
import React from "react";

const Navbar: React.FC<{ userMail: string }> = ({ userMail }) => {
    return (
        <div className="w-full bg-slate-800 p-4 text-white flex justify-between">
            <span>Booktracker</span>
            <span>
                {userMail}
                <FontAwesomeIcon
                    icon={faAngleDown}
                    className="cursor-pointer"
                />
            </span>
        </div>
    );
};
export default Navbar;
