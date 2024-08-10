/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { adminApi, userApi } from "../apis/axios";
import { toast } from 'react-hot-toast'
import { ErrorToast, SuccessToast } from "../components/Toast";
import { useUserDetailsStates } from "./UserDetailsStates";
import { getBrowserInfo, getIPAddress, getOSInfo } from "../utils/GetUserInfo";

const UseAuthContext = createContext();

export function UseAuthProvider({ children }) {
    const { setUserDetails } = useUserDetailsStates();
    const navigate = useNavigate();
    getIPAddress();

    const [browser, setBrowser] = useState("");
    const [os, setOs] = useState("");
    const [ip, setIp] = useState("");

    const [login, setLogin] = useState({ email: "", password: "" });

    const [signUp, setSignUp] = useState({ username: "", email: "", password: "", confirmPassword: "", role: 'student' });
    const [loginFormError, setLoginFormError] = useState({});
    const [signUpFormError, setSignUpFormError] = useState({});

    const [loginStatus, setLoginStatus] = useState("");
    const [signUpStatus, setSignUpStatus] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLoginFormChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });

    }

    const handleSignUpFormChange = (e) => {
        const { name, value } = e.target;
        setSignUp({ ...signUp, [name]: value });
        // console.log(signUp);
    }

    const validateLoginForm = () => {
        console.log(ip);
        
        let isValid = true;
        let errors = { isEmailEmpty: "", isPasswordEmpty: "", isEmailValid: "", };
        if (login.email.trim() === "" || login.password.trim() === "") {
            isValid = false;
            if (login.email.trim() === "")
                errors.isEmailEmpty = "Email field is required";
            if (login.password.trim() === "")
                errors.isPasswordEmpty = "Password field is required";
        }
        if (login.email.trim() !== "" && !validateEmail(login.email)) {
            isValid = false;
            errors.isEmailValid = "Email is not valid";
        }
        setLoginFormError(errors);
        return isValid;
    }

    const validateSignupForm = () => {
        let isValid = true;
        let errors = { isUsernameEmpty: "", isEmailEmpty: "", isPasswordEmpty: "", isEmailValid: "", };
        if (signUp.email.trim() === "" || signUp.password.trim() === "") {
            isValid = false;
            if (signUp.email.trim() === "")
                errors.isEmailEmpty = "Email field is required";
            if (signUp.password.trim() === "")
                errors.isPasswordEmpty = "Password field is required";
        }
        if (signUp.email.trim() !== "" && !validateEmail(signUp.email)) {
            isValid = false;
            errors.isEmailValid = "Email is not valid";
        }
        setSignUpFormError(errors);
        return isValid;
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

    const handleLogin = async (e) => {
        e.preventDefault();
        toast.remove();
        setLoading(true);
        // console.log({...login,os,browser,ip});
        if (validateLoginForm()) {
            await AuthService.Login({ ...login, os, browser, ip }).then((response) => {
                const data = response.data;
                setLoginDataInLocalStorageAndHeader(data);
                // console.log(data);
                setLoginStatus("success");
                setUserDetails();
                if (data.role === 'ADMIN') {
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/admin");
                        setTimeout(() => {
                            SuccessToast("Login successful!");
                        }, 200);
                    }, 1500);
                }
                else if (data.role === 'STUDENT') {
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/student");
                        setTimeout(() => {
                            SuccessToast("Login successful!");
                        }, 200);
                    }, 1500);
                }
            }).catch((e) => {
                const error = e.response.data;
                setLoginStatus(error);
                ErrorToast(error);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }).finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            })
        }
        else {
            setLoading(false);
        }
    }

    const handleLogOut = async () => {
        ErrorToast("Log Out... Initialized");
        await AuthService.LogOut().then((response) => {
            toast.remove();
            setTimeout(() => {
                SuccessToast(response.data);
                setTimeout(() => {
                    localStorage.clear();
                    adminApi.interceptors.request.clear();
                    navigate("/login");
                    toast.remove();
                }, 1000);
            }, 500);
        }).catch(e => {
            const error = e.response.data;
            ErrorToast(error);
        });
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (validateSignupForm()) {
            await AuthService.SignUp(signUp).then(async (response) => {
                const data = response.data;
                setSignUpStatus("success");
                await AuthService.Login({ email: signUp.email, password: signUp.password, browser, os, ip }).then((response) => {
                    const data = response.data;
                    setLoginDataInLocalStorageAndHeader(data);
                }).catch((e) => {
                    const error = e.response.data;
                });
            }).catch((e) => {
                const error = e.response.data;
                // console.log(error);
                setSignUpStatus(error);
            });
        }
    }


    const setLoginDataInLocalStorageAndHeader = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('uid', data.uid);
        localStorage.setItem('role', data.role);
        if (data.role === 'ADMIN') {
            adminApi.interceptors.request.use((config) => {
                config.headers.Authorization = "Bearer " + data.token;
                return config;
            })
        }
        if (data.role === 'STUDENT') {
            userApi.interceptors.request.use((config) => {
                config.headers.Authorization = "Bearer " + data.token;
                return config;
            })
        }
    }


    const clear = () => {
        setLogin({ email: "", password: "" });
        setLoginStatus("");
        setSignUp({ username: "", email: "", password: "", confirmPassword: "" });
        setSignUpStatus("");
        setLoginFormError({});
        setSignUpFormError({});
    }


    useEffect(() => {
        const setUserInfo = async () => {
            setBrowser(getBrowserInfo());
            setOs(getOSInfo());
            setIp(getIPAddress())
        }
        getIPAddress();
        setUserInfo();
    }, []);



    const value = {
        loading,

        login,
        loginFormError,
        loginStatus,
        setLoginStatus,
        handleLogin,
        handleLoginFormChange,

        signUp,
        signUpFormError,
        signUpStatus,
        setSignUpStatus,
        handleSignUp,
        handleSignUpFormChange,

        handleLogOut,
        clear,
    };

    return (
        <UseAuthContext.Provider value={value}>
            {children}
        </UseAuthContext.Provider>
    );
}

export const useAuthStates = () => useContext(UseAuthContext);