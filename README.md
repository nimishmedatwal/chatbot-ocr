# Chatbot Application

This repository contains the Chatbot application, which allows users to interact with an AI-powered chatbot through a web interface. Users can send text messages and upload images, which are processed by the server. The server uses OCR (Optical Character Recognition) for images and an AI model (OpenAI's GPT-3.5 Turbo) for generating responses based on user input.

## Project Structure

The project consists of two main components:

- **Server**: Handles incoming requests, processes text and image uploads, and communicates with external APIs for OCR and AI model responses.
- **Frontend**: Provides a user-friendly interface for interacting with the chatbot, allowing users to send messages and upload images.

## Technologies Used

- **Server Side**:
  - Node.js with Express.js for backend server functionality.
  - MongoDB for storing image and text data.
  - Multer for handling file uploads.
  - Tesseract.js for image text extraction.
  - OpenAI API for generating AI responses.

- **Frontend Side**:
  - React.js for building the user interface.
  - Material-UI for UI components and styling.
  - Axios for making HTTP requests to the server.

## Prerequisites

Before running the application, ensure you have the following installed and set up:

- Node.js (v14.x or later)
- npm (Node Package Manager)
- MongoDB instance (local or cloud-based) with connection URI
- OpenAI API key (for accessing AI model services)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nimishmedatwal/chatbot-ocr
   ```

2. **Install Dependencies:**

   - For both server and frontend:

     ```bash
     cd server
     npm install
     cd ../frontend
     yarn
     ```

3. **Set Environment Variables:**

   - Create a `.env` file in `server` directoriy with necessary environment variables:
   
     **Server (`server/.env`):**

     ```plaintext
     PORT=3001  # Port on which server will run
     MONGODB_URI=<your_mongodb_connection_uri>
     OPENAI_API_KEY=<your_openai_api_key>
     ```

4. **Start the Server:**

   - From the `server` directory:

     ```bash
     node server.js
     ```

5. **Start the Frontend:**

   - From the `frontend` directory:

     ```bash
     yarn dev
     ```

6. **Accessing the Application:**

   - Once both server and frontend are running, open your web browser and go to `http://localhost:5173` to access the Chatbot application.

## Functionality

- **Sending Messages**:
  - Type messages into the text input field in the frontend and press Enter or click the Send button to send them to the server.
  
- **Uploading Images**:
  - Click on the image icon in the frontend to upload an image. Once uploaded, the server processes it using OCR and displays the extracted text to the user.


## Additional Notes

- Ensure your MongoDB instance is properly configured and accessible.
- Adjust configurations and environment variables as per your deployment environment (e.g., production, staging).
- This application demonstrates the integration of OCR, AI, and frontend development for a responsive and interactive chatbot experience.
