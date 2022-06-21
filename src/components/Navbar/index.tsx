import React, { useState } from "react";
import Content from "./Content";

const Navbar: React.FC<{ userMail: string }> = ({ userMail }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    return (
        <>
            <div
                className={`bg-dark-800 border-b border-dark-600 text-white py-3
                md:hidden sticky top-0`}
            >
                <button onClick={() => setIsVisible((x) => !x)}>toggle</button>
            </div>
            <div
                className={`w-80 h-screen top-0  text-dark-200 bg-dark-800 border-r border-dark-600 flex flex-col items-start gap-4 justify-start py-10 px-10 transition-all z-20
                fixed md:sticky
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
                <Content userMail={userMail} />
            </div>
            {/* Make space outside toggled nav menu hide the menu on click */}
            {isVisible && (
                <div
                    onClick={() => {
                        setIsVisible((x) => !x);
                    }}
                    className="bg-black opacity-50 z-10 fixed top-0 w-full h-full"
                ></div>
            )}
        </>
    );
};

export default Navbar;
