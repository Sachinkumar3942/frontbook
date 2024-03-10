import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import axios from "axios";
import AccountNav from "./AccountNav";
const Account = () => {
  const Navigate = useNavigate();
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  const handleLogout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };
 
  // function linkClasses (type=null) {
  //     let classes= 'py-2 px-4   rounded-full m-4'
  //     if (type === subpage) {
  //         classes+=' bg-blue-300 '
  //     } else {
  //       classes += ' bg-gray-200';
  //     }
  //     return classes;
  //   }

  if (!ready) {
    return "loading...";
  }

  if (ready && !user && !redirect) {
    Navigate("/login");
  }

  if (redirect) {
    return redirect;
  }
  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className=" flex items-center justify-center flex-col">
          Logged in as {user.name}({user.email})
          <button
            onClick={handleLogout}
            className=" bg-orange-600 rounded-full px-6 py-2 my-2 text-white"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "bookings" && (
        <div className=" flex items-center justify-center flex-col">
          your bookings
        </div>
      )}
      {subpage === "places" && (
        <div className="">
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default Account;
