    "use client"


    import { useContext, createContext, useState } from "react";

    const UserContext = createContext();

    export const useUser = ()=>{
        return useContext(UserContext);
    }

    export function UserProvider({children}){
        const [contextUser, setContextUser] = useState([]);

        const setUserData = (data) => {
            setContextUser(data)
        }

        return(
            <UserContext.Provider value={{contextUser, setContextUser, setUserData}}>
                {children}
            </UserContext.Provider>
        )
    }