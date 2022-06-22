import { useContext } from "react";
import { UserContext } from "./ContextWrapper";
import Moon from "./Icons/Moon";
import Sun from "./Icons/Sun";
// icons as components instead of images in order for them to be dark mode dependent
const ThemeSwitcher = () => {
    const context = useContext(UserContext);
    return (
        <div className="flex gap-1">
            <Sun />
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
            <Moon />
        </div>
    );
};
export default ThemeSwitcher;
