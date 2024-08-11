/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import AdminNavbar from '../components/admin/AdminNavbar'
import { useEffect } from "react"
import { adminApi, testApi } from "../apis/axios"
import { useUserDetailsStates } from "../contexts/UserDetailsStates"
import AdminService from "../services/AdminService"
const AdminLayout = () => {
    const { setUserDetails, forceLogout } = useUserDetailsStates();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                forceLogout("Token Not Found");
                return;
            }
            else {
                adminApi.interceptors.request.use((config) => {
                    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
                    return config;
                })
                testApi.interceptors.request.use((config) => {
                    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
                    return config;
                })
                AdminService.checkToken().then((response) => {
                    if(response.data)
                        setUserDetails();
                    else
                        forceLogout("Token is Expired or Revoked")

                }).catch((e) => {
                    const error = e.response.data;
                    forceLogout("Token is Expired or Revoked")
                });
            }
        }
        checkTokenValidity();
        const intervalId = setInterval(checkTokenValidity, 60 * 1000); // 1 minutes

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);

    }, [])

    return (
        <div className="min-h-screen">
            <Toaster
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <AdminNavbar />
            <Outlet />
        </div>
    )
}

export default AdminLayout