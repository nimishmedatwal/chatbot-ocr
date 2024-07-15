import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, List, ListItem, ListItemText, Avatar, Typography, CircularProgress, Modal, Button } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input || image) {
      setLoading(true);

      const formData = new FormData();
      formData.append('text', input);
      if (image) {
        formData.append('image', image);
      }

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
      } finally {
        setLoading(false); 
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
              <Avatar src={message.image ? URL.createObjectURL(message.image) : null} alt="" sx={{ mr: 1 }} />
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
        {loading ? ( 
          <CircularProgress size={24} style={{ marginLeft: 16 }} />
        ) : (
          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
      {imageName && (
        <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
          {`Image to be uploaded: ${imageName}`}
        </Typography>
      )}
    </Box>
  );
};

export default Chatbot;
