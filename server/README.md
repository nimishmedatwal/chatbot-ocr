# Chatbot Server

This repository contains the backend server for the Chatbot application. It handles incoming messages, including text and image uploads, processes them using OCR (Optical Character Recognition) for images, and uses OpenAI's API for generating responses based on user input.

## Prerequisites

Before running the server, ensure you have the following installed and set up:

- Node.js (v14.x or later)
- npm (Node Package Manager)
- MongoDB instance (local or cloud-based) with connection URI

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the root directory of the server with the following variables:

   ```plaintext
   PORT=3001  # Port on which server will run
   MONGODB_URI=<your_mongodb_connection_uri>
   OPENAI_API_KEY=<your_openai_api_key>
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

5. **Accessing the API:**

   Once the server is running, you can access the API endpoints:

   - `POST /upload`: Handles text and image uploads, returns processed data.

6. **Testing:**

   You can test the server using tools like Postman or by integrating with the frontend client.

## Additional Notes

- This server uses Multer for handling file uploads and Tesseract.js for image text extraction.
- Ensure your MongoDB instance is properly configured and accessible.
- The server utilizes OpenAI's API for generating AI responses based on user input.

---

