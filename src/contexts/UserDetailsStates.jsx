/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { ErrorToast, SuccessToast } from "../components/Toast";
import toast from "react-hot-toast";
import { adminApi } from "../apis/axios";
import { useNavigate } from "react-router-dom";

const UseUserDetailsContext = createContext();

export function UseUserDetailsProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const forceLogout = (error) => {
        ErrorToast(error);
        setTimeout(() => {
            toast.remove();
            SuccessToast("LogOut Success!");
            setTimeout(() => {
                localStorage.clear();
                adminApi.interceptors.request.clear();
                navigate("/login");
                toast.remove();
            }, 1000);
        }, 1500);
    }

    const setUserDetails = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
            return;
        }
        if (localStorage.getItem('role') === "ADMIN") {
            AdminService.getUser().then((response) => {
                const data = response.data;
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
            }).catch((e) => {
                const error = e.response.data;
                forceLogout("Token is Expired or Revoked");
            })
        }
    }

    useEffect(() => {

    }, [])


    const value = {
        user, setUser,

        setUserDetails,

        forceLogout,
    };

    return (
        <UseUserDetailsContext.Provider value={value}>
            {children}
        </UseUserDetailsContext.Provider>
    );
}

export const useUserDetailsStates = () => useContext(UseUserDetailsContext);