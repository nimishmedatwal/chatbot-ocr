import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, List, ListItem, ListItemText, Typography, Modal, Button } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleSend = async () => {
    if (input && image) {
      const formData = new FormData();
      formData.append('text', input);
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessages([...messages, { text: response.data.inputText, image, imageName, extractedText: response.data.extractedText }]);
        setInput('');
        setImage(null);
        setImageName('');
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    }
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageName(event.target.files[0].name);
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="80vh" boxShadow={1} padding={2} borderRadius={2}>
      <Paper elevation={1} style={{ padding: 16, marginBottom: 16, flexGrow: 1, overflow: 'auto' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ backgroundColor: "#ebebeb", mb: 1, borderRadius: 2 }}>
              <ListItemText
                primary={message.text}
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" color="textSecondary">{message.imageName}</Typography>
                    <Typography variant="body2" color="textSecondary">{message.extractedText}</Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Give your image a heading..."
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleImageUpload}
          required
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <ImageIcon />
          </IconButton>
        </label>
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
      {imageName && (
        <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
          {`Image to be uploaded: ${imageName}`}
        </Typography>
      )}

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" id="image-modal-title" gutterBottom>
            Image Preview
          </Typography>
          <img src={image ? URL.createObjectURL(image) : ''} alt="Preview" style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }} />
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleModalClose} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Chatbot;
