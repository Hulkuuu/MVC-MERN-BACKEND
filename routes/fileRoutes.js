// backend/routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig'); // Import multer config
const fileController = require('../controllers/fileController');

// Route to handle file upload
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
