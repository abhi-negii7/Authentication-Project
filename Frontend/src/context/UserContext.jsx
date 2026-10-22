import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const dataContext = createContext();
const serverURL = import.meta.env.VITE_SERVER_URL;

function UserContext({ children }) {
  // let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let [userData, setUserData] = useState(null);
  const getUserData = async () => {
    try {
      let { data } = await axios.get(serverURL + "/getUserData", {
        withCredentials: true,
      });
      setUserData(data.user);
    } catch (error) {
      setUserData(null);

      if (error.response?.status !== 401) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = { serverURL, userData, setUserData, getUserData, loading };
  useEffect(() => {
    getUserData();
  }, []);
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
