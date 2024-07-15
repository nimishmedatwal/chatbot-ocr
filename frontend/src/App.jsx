import React from 'react';
import Chatbot from './chatbot.jsx';
import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Chatbot />
    </Container>
  );
}

export default App;