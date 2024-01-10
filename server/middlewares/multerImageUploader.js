const multer = require("multer"); // for handling file uploads
const path = require("path"); // for handling file paths

// Create a multer storage configuration to save the uploaded file
const createMulterMiddleware = (destinationFolder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/images/${destinationFolder}`);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  return multer({
    storage: storage,
    // Add other configurations if needed
  });
};

module.exports = createMulterMiddleware;
