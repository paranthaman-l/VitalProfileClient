import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
const AuthLayout = () => {
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
            <Outlet />
        </div>
    )
}

export default AuthLayout