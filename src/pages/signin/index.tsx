import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { supabaseClient } from "../../utils/supabaseClient";

export default function SignIn() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            const res = await supabaseClient.auth.signIn({
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            });
            if (res.error?.message) {
                alert(res.error.message);
                throw res.error;
            }
            router.push("/");
        } catch (error) {
            console.log(error);
        }
        return;
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-light-800 dark:bg-dark-800">
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-md flex flex-col gap-6 text-xl text-dark-800 dark:text-white "
            >
                <input placeholder="Email" type="text" name="email" />
                <input placeholder="Password" type="password" name="password" />
                <button type="submit" className="btn-primary self-stretch">
                    <span className="">Sign in</span>
                </button>
                <p className="text-xs">
                    Don't have an account yet?{" "}
                    <Link href="/signin/register">
                        <a className="text-orange-500">Sign up</a>
                    </Link>
                </p>
            </form>
        </div>
    );
}
