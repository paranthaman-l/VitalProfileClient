/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { UseAuthProvider } from "./UseAuthStates";
import { UseUserDetailsProvider } from "./UserDetailsStates";

const Context = createContext();

export const States = ({ children }) => {

    const value = {};

    return (
        <Context.Provider value={value}>
            <UseUserDetailsProvider>
                <UseAuthProvider>
                    {children}
                </UseAuthProvider>
            </UseUserDetailsProvider>
        </Context.Provider>
    );
};

export const useStates = () => useContext(Context);
