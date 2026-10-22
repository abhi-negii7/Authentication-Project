import React, { useContext, useState } from "react";
import axios from "axios";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let { serverURL, userData, setUserData, getUserData } =
    useContext(dataContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        serverURL + "api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      setUserData(response.data.user);
      // setUserData(response.data);
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.response.data.status);
      // console.log("URL:", error.config?.url);
      // console.log("Status:", error.response?.status);
      // console.log("Response:", error.response?.data);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        className="w-full max-w-sm space-y-3 rounded-lg bg-white p-4 shadow-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-center text-2xl font-bold">
          Login to your Account
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter the Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border p-2 text-sm outline-none focus:border-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter the password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md border p-2 text-sm outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>
        <p
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/signup")}
        >
          Want to create a account?{" "}
          <span className="text-blue-700">Signup</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
