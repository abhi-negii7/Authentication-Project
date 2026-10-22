import mongoose from "mongoose";
const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Db connected successfully")
  } catch (error) {
    console.log("error : " + error);
  }
}

export default connectDb;
