import React from 'react';
import HomePage from './HomePage';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useRouteMatch
} from "react-router-dom";
import './App.css';
import useToken from './utils/useToken';

function App() {

  const { token, setToken } = useToken();

  /*if(!token) {
    return <Login setToken={setToken} />
  }*/

  const theme = createTheme({
    status: {
      danger: 'orange',
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Router>
      <HomePage />
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;