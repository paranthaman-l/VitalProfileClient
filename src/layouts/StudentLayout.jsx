/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster } from "react-hot-toast"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { testApi, userApi } from "../apis/axios"
import { useUserDetailsStates } from "../contexts/UserDetailsStates"
import StudentService from "../services/StudentService"
import StudentNavbar from "../components/student/StudentNavbar"
const StudentLayout = () => {
    const { setUserDetails, forceLogout } = useUserDetailsStates();
    const navigate = useNavigate();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                forceLogout("Token Not Found");
                return;
            }
            else {
                userApi.interceptors.request.use((config) => {
                    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
                    return config;
                })
                testApi.interceptors.request.use((config) => {
                    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
                    return config;
                })
                StudentService.checkToken().then((response) => {
                    if (response.data)
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
            <StudentNavbar />
            <Outlet />
        </div>
    )
}

export default StudentLayout