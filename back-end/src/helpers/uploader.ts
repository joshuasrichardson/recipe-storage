import multer from "multer";

const upload = multer({
  dest: process.env.IMAGES_DIR + "/images/",
  limits: {
    fileSize: 1048576,
  },
});

export default upload;
