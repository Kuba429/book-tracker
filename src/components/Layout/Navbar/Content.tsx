import Link from "next/link";
import { useRouter } from "next/router";
import { supabaseClient } from "utils/supabaseClient";
import ThemeSwitcher from "components/shared/ThemeSwitcher";

const Content: React.FC<{ userMail: string }> = ({ userMail }) => {
	const router = useRouter();
	const handleSignOut = async () => {
		await supabaseClient.auth.signOut();
		router.push("/signin");
	};
	return (
		<>
			<h1 className="text-3xl text-dark-800 dark:text-white">
				Book Tracker
			</h1>
			{links.map((l) => {
				return (
					<Link key={l.url} href={l.url}>
						<a
							className={`text-dimmed ${
								router.pathname == l.url
									? "text-dark-800 dark:text-white"
									: "" // highlight link leading to current page
							}`}
						>
							{l.name}
						</a>
					</Link>
				);
			})}
			<ThemeSwitcher />
			<Link href={"/myprofile"}>
				<a className="text-dimmed">{userMail}</a>
			</Link>
			<button className="btn" onClick={handleSignOut}>
				<span>Sign out</span>
			</button>
		</>
	);
};
export default Content;

const links = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "Books",
		url: "/books",
	},
	{
		name: "My List",
		url: "/mylist",
	},
	{
		name: "My Profile",
		url: "/myprofile",
	},
];
