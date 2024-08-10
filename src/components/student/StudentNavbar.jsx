import { useAuthStates } from "../../contexts/UseAuthStates";
import { useUserDetailsStates } from "../../contexts/UserDetailsStates"

const StudnetNavbar = () => {
  const { user } = useUserDetailsStates();
  const { handleLogOut } = useAuthStates();
  return (
    <div className="flex justify-between h-20 ">
      <div className="">

      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <p>{user.name}</p>
          <p>{user.role}</p>
        </div>
        <button value={"LogOut"} className="border-[1px] p-2 rounded-md cursor-pointer bg-blue-500 text-white" onClick={handleLogOut}>LogOut</button>
      </div>
    </div>
  )
}

export default StudnetNavbar