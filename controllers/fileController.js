// controllers/fileController.js
const csv = require('csv-parser');
const fs = require('fs');
const Student = require('../models/Student');

exports.uploadStudentsFromCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const students = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => students.push(data))
    .on('end', async () => {
      try {
        await Student.insertMany(students);
        res.status(200).json({ message: 'Students imported successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to import students', error });
      }
    })
    .on('error', (error) => {
      res.status(500).json({ message: 'File processing error', error });
    });
};
