import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    let result = await cloudinary.uploader.upload(filePath);
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw error;
  } finally {
    // Delete the temporary file whether upload succeeds or fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export default uploadOnCloudinary;
