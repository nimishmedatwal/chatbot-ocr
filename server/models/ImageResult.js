// models/ImageResult.js
const mongoose = require('mongoose');

const imageResultSchema = new mongoose.Schema({
  textData: { type: String, required: true },
  extractedText: { type: String, required: true },
  imageData: { type: Buffer, required: true },
  imageName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ImageResult = mongoose.model('ImageResult', imageResultSchema);

module.exports = ImageResult;
