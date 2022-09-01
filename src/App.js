import React from 'react';
import CrudPage from './CrudPage';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './App.css';

function App() {
  const theme = createTheme({
    status: {
      danger: 'orange',
      
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CrudPage />
    </div>
    </ThemeProvider>
  );
}

export default App;