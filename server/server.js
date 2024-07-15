// server.js
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');
const ImageResult = require('./models/ImageResult');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to receive image and text data
app.post('/upload', upload.single('image'), (req, res) => {
  const textData = req.body.text;
  const imageData = req.file;

  if (!imageData) {
    return res.status(400).send('No image uploaded');
  }

  Tesseract.recognize(imageData.buffer, 'eng', {
    logger: (m) => console.log(m),
  })
    .then(async ({ data: { text } }) => {
      const newImageResult = new ImageResult({
        textData,
        extractedText: text,
        imageData: imageData.buffer,
      });
      await newImageResult.save();

      res.json({ extractedText: text, inputText: textData });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
