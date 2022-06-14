import { ScriptProps } from "next/script";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { userDataInterface } from "../interfaces";

export const UserContext = createContext<{
    userData: userDataInterface;
    setUserData: Dispatch<SetStateAction<userDataInterface>>;
} | null>(null);

export default function ContextWrapper({ children }: ScriptProps) {
    const [userData, setUserData] = useState<userDataInterface>({
        email: "",
        id: "",
    });
    return (
        <UserContext.Provider value={{ userData: userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
