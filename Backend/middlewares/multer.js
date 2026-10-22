import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
