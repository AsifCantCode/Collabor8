const multer = require("multer"); // for handling file uploads
const path = require("path"); // for handling file paths

// Create a multer storage configuration to save the uploaded file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/questions");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
}); // You can use a disk storage if needed

const upload = multer({
  storage: storage,
  // limits: { fieldSize: 2 * 1024 * 1024 },
});

module.exports = upload;
