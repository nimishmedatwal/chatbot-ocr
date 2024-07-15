# Chatbot Frontend

This repository contains the frontend client for the Chatbot application. It allows users to interact with the chatbot by sending text messages and uploading images, which are processed and displayed in the chat interface.

## Prerequisites

Before running the frontend, ensure you have the following installed and set up:

- Node.js (v14.x or later)
- npm (Node Package Manager)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   Yarn
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the root directory of the frontend with the following variable:

   ```plaintext
   REACT_APP_SERVER_URL=http://localhost:5173
   ```

4. **Start the Frontend:**

   ```bash
   yarn dev
   ```

5. **Accessing the Application:**

   Once the frontend is running, open your web browser and go to `http://localhost:5173` 

6. **Using the Chatbot:**

   - Type messages into the text input field and press Enter or click the Send button to send them to the server.
   - Click on the image icon to upload an image. Once uploaded, it will be processed and displayed in the chat.

7. **Testing:**

   Test the frontend by interacting with the chatbot interface, ensuring both text and image uploads function correctly.

## Additional Notes

- This frontend is built using React with Material-UI for UI components.
- Ensure the backend server (`server`) is running and accessible at the specified URL.
- The chat interface displays messages and processed image data received from the server.

---