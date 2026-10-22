import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  try {
    // Take the token from the cookie which is stored in browser
    let token = req.cookies.token;

    // if token is not in cookie
    if (!token) {
      return res.status(401).json({ message: "user is not authenticated" });
    }

    // if token is inside the cookie verify the cookie using jwt that token is valid and return the user id
    // Return the object which contain the user id also
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
