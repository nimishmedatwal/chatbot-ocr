import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, List, ListItem, ListItemText, Avatar } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);

  const handleSend = async () => {
    if (input || image) {
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
        setMessages([...messages, { text: response.data.inputText, image, extractedText: response.data.extractedText }]);
        setInput('');
        setImage(null);
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    }
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="80vh" boxShadow={1} padding={2} borderRadius={2}>
      <Paper elevation={1} style={{ padding: 16, marginBottom: 16, flexGrow: 1, overflow: 'auto' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{backgroundColor:"#ebebeb", mb:1, borderRadius:2 }}>
              <Avatar src={message.image} alt="" sx={{mr:1}}/>
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleImageUpload}
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
    </Box>
  );
};

export default Chatbot;
