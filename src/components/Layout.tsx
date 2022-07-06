import { useRouter } from "next/router";
import { ScriptProps } from "next/script";
import { useContext, useEffect } from "react";
import { supabaseClient } from "utils/supabaseClient";
import { UserContext } from "./ContextWrapper";
import Navbar from "./Navbar/index";

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
	}, []); // linter complains about dependency here but i think it's ok because i only want to call it once and store it in context

	return (
		<>
			<div
				className={`h-full md:flex min-h-screen bg-light-800 dark:bg-dark-800 transition-colors`}
			>
				<Navbar userMail={context!.userData.email} />
				<main className="w-11/12 mx-auto pb-2 px-0 md:px-3">
					{children}
				</main>
			</div>
		</>
	);
}
