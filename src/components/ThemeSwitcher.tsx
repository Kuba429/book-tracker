import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserContext } from "./ContextWrapper";
const ThemeSwitcher = () => {
    const context = useContext(UserContext);
    return (
        <div className="flex items-center gap-1 mt-auto">
            <FontAwesomeIcon icon={faSun} className="text-xl" />
            <label
                className={`bg-orange-400 w-12 h-6 flex relative rounded-full cursor-pointer`}
            >
                <div
                    className={`bg-white w-4 h-4 absolute top-1 left-1 transition-all
						dark:translate-x-6
						rounded-full p-1`}
                ></div>
                <input // input for semantics, not doing anything
                    className="hidden"
                    name="dark_mode"
                    onChange={context?.darkMode.toggle}
                    checked={context?.darkMode.value}
                    type="checkbox"
                />
            </label>
            <FontAwesomeIcon icon={faMoon} className="text-xl" />
        </div>
    );
};
export default ThemeSwitcher;
