import React, { useContext } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import { dataContext } from "./context/UserContext.jsx";

function App() {
  let { userData, loading } = useContext(dataContext);
 if (loading) return <div>Loading...</div>;

 return (
   <Routes>
     <Route
       path="/login"
       element={userData ? <Navigate to="/" replace /> : <Login />}
     />
     <Route path="/signup" element={<Signup />} />
     <Route
       path="/"
       element={userData ? <Home /> : <Navigate to="/login" replace />}
     />
   </Routes>
 );
}

export default App;
