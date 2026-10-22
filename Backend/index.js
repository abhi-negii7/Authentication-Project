import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

// We need to set credentails as true because otherwise it will not accept the cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/", authRouter);
let port = process.env.PORT || 4000;

//Route
app.get("/", (req, res) => {
  res.send("Hello Server");
});

app.listen(port, () => {
  connectDb();
  console.log(`Server Started at port http://localhost:${port}`);
});
