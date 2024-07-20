const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');
const cors = require('cors');
const ImageResult = require('./models/ImageResult');
const dotenv = require('dotenv');
const axios = require('axios');
const { AzureOpenAI } = require("openai");
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ;
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-04-01-preview";
const deployment = "openaitest";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to receive image and text data
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const textData = req.body.text;
    const imageData = req.file;
    const imageName = req.file ? req.file.originalname : '';

    if (textData && !imageData) {
      // Handle text input with AI response (using GPT-3)
      const aiResponse = await generateAIResponse(textData);
      console.log(aiResponse);
      res.json({ inputText: textData, response: aiResponse });
    } else if (imageData) {
      // Handle image upload with text extraction
      Tesseract.recognize(imageData.buffer, 'eng', {
        logger: (m) => console.log(m),
      })
        .then(async ({ data: { text } }) => {
          const newImageResult = new ImageResult({
            textData,
            extractedText: text,
            imageData: imageData.buffer,
            imageName,
          });
          await newImageResult.save();

          res.json({ extractedText: text, inputText: textData });
        })
        .catch((error) => {
          console.error('Tesseract processing error:', error);
          res.status(500).json({ error: 'Error processing image with Tesseract' });
        });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function generateAIResponse(inputText) {
  try {
    const client = new AzureOpenAI({
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      apiVersion: apiVersion
    });

    const response = await client.chat.completions.create({
      model: deployment,
      messages:  [
        { role: "system", content: "You are a helpful assistant ." },
        { role: "user", content: `${inputText}` },  
      ],
    });
  const resAi= response.choices[0].message.content;
  return resAi;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Error generating AI response');
  }
}


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
