import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType>({
    auth: {},
    setAuth: () =>{}
})

interface props {
    children: React.ReactElement
}

interface AuthContextType {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
  }
  

export const AuthProvider = (props: props) =>{
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}