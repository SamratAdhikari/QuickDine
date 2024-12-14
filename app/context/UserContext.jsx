"use client";

import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [contextUser, setContextUser] = useState("675cdd072d28ff5599733aa2");

  const setUserData = (data) => {
    setContextUser(data);
  };

  return (
    <UserContext.Provider value={{ contextUser, setContextUser, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
