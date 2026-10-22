import express, { Router } from "express";
import { login, signup,logout, getUserData } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.js";
import {checkAuth} from "../middlewares/checkAuth.js";

const authRouter = express(Router());

// Why signup and not signup()?
// - signup passes the function reference to Express. Express calls it when a request matches /signup.
// - signup() executes the function immediately when this line runs, rather than passing the function itself.
authRouter.post("/signup",upload.single("profileImage"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/getUserData",checkAuth,getUserData)
export default authRouter;
