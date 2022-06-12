import { FormEvent, useRef } from "react";
import { supabaseClient } from "../../utils/supabaseClient";

export default function SignIn() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const res = await supabaseClient.auth.signIn({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });
        console.log(res);
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
