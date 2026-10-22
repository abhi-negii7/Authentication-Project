import uploadOnCloudinary from "../config/cloudinary.js";
import generateToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// Signup Controller

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // some field are missing
    if (!name || !username || !email || !password) {
      return res.status(400).json({ status: "Some fields missing" });
    }

    // console.log(req.file);
    let profileImage;
    if (req.file) {
      // console.time("Cloudinary upload");
      profileImage = await uploadOnCloudinary(req.file.path);
      // console.timeEnd("Cloudinary upload");
    }
    // MongoDB also requires usernames to be unique.
    // Because username is a field defined in your User Mongoose schema. MongoDB searches that field for a matching value.
    // - $or means either condition can match.
    // - { email } is shorthand for { email: email }.
    // - { username } is shorthand for { username: username }.
    // user alreay exist
    const existUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existUser) {
      if (existUser.email === email) {
        return res.status(400).json({
          status: "Email already exists",
        });
      }

      if (existUser.username === username) {
        return res.status(400).json({
          status: "Username already exists",
        });
      }
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      profileImage,
    });

    // Generate the token
    let token = generateToken(user._id);

    // set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ name, username, email, profileImage });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server error",
      message: error.message,
    });
  }
};

// Login Controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "Field are missing" });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ status: "User does not exist" });
    }

    let match = await bcrypt.compare(password, existUser.password);
    if (!match) {
      return res.status(400).json({ status: "Incorrect password" });
    }

    // Generate the token
    let token = generateToken(existUser._id);

    // set the cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT == "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      name: existUser.name,
      username: existUser.username,
      email: existUser.email,
      profileImage: existUser.profileImage,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server error",
      message: error.message,
    });
  }
};

// Logout Controller

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      status: "Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server error",
      message: error.message,
    });
  }
};

// To get user data

export const getUserData = async (req, res) => {
  try {
    let userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
