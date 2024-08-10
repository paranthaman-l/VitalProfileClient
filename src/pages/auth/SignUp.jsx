import { useAuthStates } from "../../contexts/UseAuthStates";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signUp, handleSignUp, handleSignUpFormChange, loading, signUpFormError } = useAuthStates();
  const navigate = useNavigate();
  return (

    <div className="flex min-h-screen items-center justify-center">
      <form className={`flex flex-col min-h-52 justify-around`} onSubmit={loading ? (e) => { e.preventDefault() } : handleSignUp}>
        <div className="">
          <input type="text" className={`border-[1px] p-2 outline-none rounded-sm text-xl ${(signUpFormError.isUsernameEmpty) && "border-red-600"}`} placeholder="Username" onChange={handleSignUpFormChange} value={signUp.username} name="username" id="username" />
        </div>
        <div className="">
          <input type="email" className={`border-[1px] p-2 outline-none rounded-sm text-xl ${(signUpFormError.isEmailEmpty || signUpFormError.isEmailValid) && "border-red-600"}`} placeholder="Email" onChange={handleSignUpFormChange} value={signUp.email} name="email" id="email" />
        </div>
        <div className="">
          <input type="password" className={`border-[1px] p-2 outline-none rounded-sm text-xl ${(signUpFormError.isPasswordEmpty) && "border-red-600"}`} placeholder="Password" onChange={handleSignUpFormChange} value={signUp.password} name="password" id="password" />
        </div>
        <div className="">
          <input type="password" className={`border-[1px] p-2 outline-none rounded-sm text-xl ${(signUpFormError.isPasswordEmpty) && "border-red-600"}`} placeholder="Confirm Password" onChange={handleSignUpFormChange} value={signUp.confirmPassword} name="confirmPassword" id="confirmPassword" />
        </div>
        <div className="flex justify-end">
          <p className="cursor-pointer" onClick={() => navigate("/login")}>Login...</p>
        </div>
        <input type="submit" className={`${loading && "disabled"} border-[1px] p-2 rounded-md cursor-pointer bg-blue-500 text-white`} value={`${loading ? "Loading..." : "Sign Up"}`} />
      </form>
    </div>
  )
}

export default SignUp