import { ScriptProps } from "next/script";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import useDarkMode, { DarkMode } from "use-dark-mode";
import { userDataInterface } from "interfaces";

export const UserContext = createContext<{
	userData: userDataInterface;
	setUserData: Dispatch<SetStateAction<userDataInterface>>;
	darkMode: DarkMode;
	addedBooksIds: Array<string>;
	setAddedBooksIds: Dispatch<SetStateAction<string[]>>;
} | null>(null);

export default function ContextWrapper({ children }: ScriptProps) {
	const [userData, setUserData] = useState<userDataInterface>({
		email: "",
		id: "",
	});
	const [addedBooksIds, setAddedBooksIds] = useState<Array<string>>([]);
	let darkMode = useDarkMode(false, {
		classNameDark: "dark",
		classNameLight: "light",
	});

	return (
		<UserContext.Provider
			value={{
				userData,
				setUserData,
				darkMode,
				addedBooksIds,
				setAddedBooksIds,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
