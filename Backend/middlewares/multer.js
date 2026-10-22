// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "./public");
//   },
//   filename: (req, file, cb) => {
//     // console.log(file);
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage });


import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always locate public relative to this file
const uploadDir = path.resolve(__dirname, "../public");

// Create the folder if it doesn't exist
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
