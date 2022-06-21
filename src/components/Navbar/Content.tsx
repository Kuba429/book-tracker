import Link from "next/link";
import { useRouter } from "next/router";
import { supabaseClient } from "../../utils/supabaseClient";

const Content: React.FC<{ userMail: string }> = ({ userMail }) => {
    const router = useRouter();
    const handleSignOut = async () => {
        await supabaseClient.auth.signOut();
        router.push("/signin");
    };
    return (
        <>
            <h1 className="text-3xl text-white">Book Tracker</h1>
            {links.map((l) => {
                return (
                    <Link href={l.url}>
                        <a className={`text-dimmed`}>{l.name}</a>
                    </Link>
                );
            })}
            <span className="text-dimmed">{userMail}</span>
            <button className="text-dimmed" onClick={handleSignOut}>
                Sing out
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
];
