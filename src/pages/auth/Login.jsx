/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthStates } from "../../contexts/UseAuthStates";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login,loginFormError,loading, handleLogin, handleLoginFormChange } = useAuthStates();
  const navigate = useNavigate();
  console.log(login);


  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className={`flex flex-col min-h-52 justify-around`} onSubmit={loading ? (e)=>{e.preventDefault()} : handleLogin}>
        <div className="">
        <input type="text" className={`border-[1px] p-2 outline-none rounded-sm text-xl ${(loginFormError.isEmailEmpty || loginFormError.isEmailValid) && "border-red-600"}`} placeholder="Email" onChange={handleLoginFormChange} value={login?.email} name="email" id="email" />
        </div>
        <div className="">
          <input type="password" className={`border-[1px] p-2 outline-none rounded-sm text-xl ${(loginFormError.isPasswordEmpty) && "border-red-600"}`} placeholder="Password" onChange={handleLoginFormChange} value={login?.password} name="password" id="password" />
        </div>
        <div className="flex justify-end">
          <p className="cursor-pointer" onClick={()=>navigate("/signUp")}>SignUp...</p>
        </div>
        <input type="submit" className={`${loading && "disabled"} border-[1px] p-2 rounded-md cursor-pointer bg-blue-500 text-white`} onChange={handleLoginFormChange} value={`${loading ? "Loading..." : "Login"}`} />
      </form>
    </div>
  )
}

export default Login