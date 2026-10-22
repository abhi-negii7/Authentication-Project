import React, { useContext } from "react";
import { dataContext } from "../context/UserContext";
import dp from "../assets/profile-blank-img.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  let { userData, setUserData, getUserData, serverURL } =
    useContext(dataContext);
  let navigate = useNavigate();
  if (!userData) {
    return null;
  }

  // const handleLogout = async () => {
  //   try {
  //     // let data = axios.post(serverURL + "/logout", { withCredential: true });
  //     // setUserData(null);
  //     await axios.post(serverURL + "/logout", {}, { withCredentials: true });
  //     setUserData(null);
  //     navigate("/login", { replace: true });
  //   } catch (error) {
  //     setUserData(null);

  //     if (error.response?.status === 401) {
  //       navigate("/login", { replace: true });
  //       return;
  //     }
  //   }
  // };

const handleLogout = async () => {
  try {
    await axios.post(`${serverURL}api/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.log("Logout error:", error);
  } finally {
    setUserData(null);
    navigate("/login", { replace: true });
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
        {/* Profile Picture */}
        <img
          src={userData.profileImage || dp}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />

        {/* User Details */}
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-800">
            Hello, {userData.name}!
          </h1>

          <p className="text-sm text-gray-500 mt-1 break-all">
            {userData.email}
          </p>

          <p className="text-sm text-indigo-600 font-medium mt-2">
            Welcome back!
          </p>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
