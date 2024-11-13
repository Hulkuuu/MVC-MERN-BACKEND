// backend/middleware/multerConfig.js

const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure you have an 'uploads' folder in the root
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with the original extension
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});

// Initialize and export multer with the defined storage
const upload = multer({ storage: storage });
module.exports = upload;
