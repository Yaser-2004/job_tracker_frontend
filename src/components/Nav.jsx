import { Link, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { logout } from "../store";


const Nav = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="NavBar pt-8 flex justify-between items-center pb-16 max-sm:justify-center">
      <div>
        <p className={`max-sm:hidden text-3xl border p-2 pl-3 pr-3 rounded-full w-fit border-black max-sm:text-xl max-sm:p-2`}>JobTracker</p>
      </div>
      <div className="flex items-center gap-14 max-sm:gap-6 max-sm:text-sm">
        <Link to={'/user'}>Dashboard</Link>
        <Link to={'/add'}>Add Job</Link>
        {user ? (
          <button 
            onClick={handleSignOut} 
            className="border border-black rounded-full p-6 pt-2 pb-2 max-sm:p-1"
          >
            Sign Out
          </button>
        ) : (
          <Link to={'/register'} className="border border-black rounded-full p-6 pt-2 pb-2">
            Get Started
          </Link>
        )}
      </div>
    </div>
  )
}

export default Nav
