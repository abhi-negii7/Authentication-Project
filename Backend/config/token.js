import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // function in jsonwebtoken jwt.sign() to generate the token
  let token = jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

export default generateToken;
