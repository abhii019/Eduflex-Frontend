/* eslint-disable react/prop-types */

import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../../context/UserContext";
import toast from "react-hot-toast";
import "./account.css";
import { useNavigate } from "react-router-dom";
const Account = ({user}) => {
  const {setIsAuth , setUser} = UserData()
  const navigate = useNavigate();
  const logoutHandler = () =>{
    localStorage.clear()
    setUser([])
    setIsAuth(false);
    toast.success("Logged out Successfully")
    navigate("/login");
  }
  return (
    <div>
    {user &&   <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Name- {user.name}</strong>
          </p>
          <p>
            <strong>Email- {user.email}</strong>
          </p>
          <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="commonbtn"
            ><MdDashboard/>Dashboard</button>
            <br/>
            {
              user.role ==="admin" &&( <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="commonbtn"
              ><MdDashboard/> Admin Dashboard</button>)
            }
            
          <button onClick={logoutHandler} className="commonbtn" style={{background: "red"}}><IoMdLogOut/>Logout</button>

        </div>
      </div> }
    </div>
  )
}

export default Account
