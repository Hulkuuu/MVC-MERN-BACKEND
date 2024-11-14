// routes/fileRoutes.js
const express = require('express');
const { uploadStudentsFromCSV } = require('../controllers/fileController');
const upload = require('../middleware/multerConfig');

const router = express.Router();

router.post('/upload-students', upload.single('file'), uploadStudentsFromCSV);

module.exports = router;
