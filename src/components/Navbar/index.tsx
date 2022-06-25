import { faAnglesLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Content from "./Content";

const Navbar: React.FC<{ userMail: string }> = ({ userMail }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    return (
        <>
            <div
                className={`bg-light-800 border-b border-light-600 text-dark-800
                dark:bg-dark-800 dark:border-b dark:border-dark-600 dark:text-white
                py-0 md:hidden sticky top-0`}
            >
                <button className="p-2" onClick={() => setIsVisible((x) => !x)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            <div
                className={`w-full sm:w-80 h-full top-0 border-r 
                text-light-200 bg-light-600 border-light-600
                dark:text-dark-200 dark:bg-dark-800 dark:border-dark-600
                flex flex-col items-start gap-4 justify-start py-10 px-10 transition-all z-20
                fixed md:sticky
                ${!isVisible && "-translate-x-full"} 
                md:translate-x-0
                `}
            >
                <button
                    className="md:hidden self-end"
                    onClick={() => {
                        setIsVisible(false);
                    }}
                >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>
                <Content userMail={userMail} />
            </div>
            {/* Make space outside toggled nav menu hide the menu on click */}
            {isVisible && (
                <div
                    onClick={() => {
                        setIsVisible((x) => !x);
                    }}
                    className="bg-dark-800 opacity-50 z-10 fixed top-0 w-full h-full"
                ></div>
            )}
        </>
    );
};

export default Navbar;
