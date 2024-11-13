// backend/controllers/fileController.js

exports.uploadFile = (req, res) => {
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
  };
  