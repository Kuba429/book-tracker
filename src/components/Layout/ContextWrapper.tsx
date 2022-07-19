import { ScriptProps } from "next/script";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import useDarkMode, { DarkMode } from "use-dark-mode";
import { userDataInterface } from "interfaces";
import { fetchByQuery } from "supabase/fetch/fetchByQuery";

export const UserContext = createContext<{
	userData: userDataInterface;
	setUserData: Dispatch<SetStateAction<userDataInterface>>;
	darkMode: DarkMode;
	addedBooksIDs: string[] | null;
	setAddedBooksIDs: Dispatch<SetStateAction<string[] | null>>;
	refetchReadIDs: () => Promise<void>;
} | null>(null);

export default function ContextWrapper({ children }: ScriptProps) {
	const [userData, setUserData] = useState<userDataInterface>({
		email: "",
		id: "",
	});
	const [addedBooksIDs, setAddedBooksIDs] = useState<string[] | null>(null);
	const refetchReadIDs = async () => {
		if (addedBooksIDs !== null) return;
		const res = await fetchByQuery("read_books", "books(id)", [
			"user_id",
			userData.id,
		]);
		console.log(res);
		setAddedBooksIDs(res.map((x) => x.books.id.toString()));
	};
	let darkMode = useDarkMode(false, {
		classNameDark: "dark",
		classNameLight: "light",
	});
	useEffect(() => {
		console.log(addedBooksIDs);
	}, [addedBooksIDs]);
	return (
		<UserContext.Provider
			value={{
				userData,
				setUserData,
				darkMode,
				addedBooksIDs,
				setAddedBooksIDs,
				refetchReadIDs,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
