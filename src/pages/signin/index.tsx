import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";
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
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-96 rounded border border-gray-300 p-4 mx-auto my-2"
            >
                <input placeholder="email" type="text" name="email" />
                <input placeholder="password" type="password" name="password" />
                <button type="submit" className="bg-gray-300">
                    Sign in
                </button>
            </form>
        </div>
    );
}
