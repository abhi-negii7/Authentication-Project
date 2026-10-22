import React, { useContext, useRef, useState } from "react";
import dp from "../assets/profile-blank-img.svg";
import axios from "axios";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  // react-router-dom has a hook to navigate through one page to another page
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let file = useRef(null);
  let { serverURL, userData, setUserData, getUserData } =
    useContext(dataContext);
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      }

      let data = await axios.post(serverURL + "/signup", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      // let data = await axios.post(
      //   serverURL + "/signup",
      //   {
      //     name,
      //     username,
      //     email,
      //     password,
      //   },
      //   { withCredentials: true }
      // );
      setUserData(data.data);
      await getUserData();
      navigate("/");

      // console.log(data);
    } catch (error) {
      console.log("URL:", error.config?.url);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // This function lets the user select a profile image, stores the actual file for the backend, and displays a preview in the frontend.
  // Stores the image URL displayed in your React UI. Initially, it shows your default image dp
  let [frontendImage, setFrontendImage] = useState(dp);
  // Stores the actual selected file. Initially, no file is selected, so its value is null.
  let [backendImage, setBackendImage] = useState(null);
  function handleImage(e) {
    // Gets the file selected by the user through an <input type="file" />.
    let file = e.target.files[0];
    // Stores the file object so you can later send it to your backend.
    setBackendImage(file);
    // Creates a temporary URL that allows the browser to display the selected image without uploading it to the server.
    let image = URL.createObjectURL(file);
    // Updates the frontend image so the selected photo appears immediately.
    setFrontendImage(image);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        className="w-full max-w-sm space-y-3 rounded-lg bg-white p-4 shadow-md"
        onSubmit={handleSignup}
      >
        <h2 className="text-center text-2xl font-bold">Create New Account</h2>
        <input type="file" hidden ref={file} onChange={handleImage} />
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-20 w-20 rounded-full border-2 border-gray-300 bg-gray-100">
            <img
              src={frontendImage}
              alt="blank-profile"
              className="h-full w-full rounded-full object-cover"
            />

            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black text-xl text-white opacity-0 transition-opacity duration-300 hover:opacity-50"
              // When we click it file input get triggered
              onClick={() => file.current.click()}
            >
              +
            </div>
          </div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Enter the Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-md border p-2 text-sm outline-none focus:border-blue-500"
        />

        <input
          type="text"
          name="username"
          placeholder="Enter the Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full rounded-md border p-2 text-sm outline-none focus:border-blue-500"
        />

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
        {/* <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Sign Up
        </button> */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading && (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <p
          className="cursor-pointer hover:text-blue-700"
          onClick={() => navigate("/login")}
        >
          Already have an account?
          <span className="text-blue-700">Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
