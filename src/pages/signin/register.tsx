import { useRouter } from "next/router";
import { FormEvent } from "react";
import { supabaseClient } from "../../utils/supabaseClient";

export default function SignUp() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");
            if (password !== confirmPassword) {
                alert("Passwords don't match");
                throw new Error("Passwords don't match");
            }
            const res = await supabaseClient.auth.signUp({
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
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-96 rounded border border-gray-300 p-4 mx-auto my-2"
            >
                <input placeholder="email" type="text" name="email" />
                <input placeholder="password" type="password" name="password" />
                <input
                    placeholder="confirm password"
                    type="password"
                    name="confirmPassword"
                />
                <button type="submit" className="bg-gray-300">
                    Sign up
                </button>
            </form>
        </div>
    );
}
