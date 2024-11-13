const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const upload = require('./middleware/multerConfig'); // Import multer configuration

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// File Upload Route (can be adjusted to fit your application logic)
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
