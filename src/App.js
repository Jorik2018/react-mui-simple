import { useEffect } from 'react';
import HomePage from './HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';
import useToken, { Login } from './utils/useToken';
import { gapi } from 'gapi-script';

function App() {

  const { token, setToken ,logOut} = useToken();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID,
        scope: ''
      });
      const accessToken = gapi.auth.getToken();
      console.log(accessToken);
    };
    gapi.load('client:auth2', initClient);
  }, []);

  if (!token) {
    return <Login setToken={setToken} />
  }

  const theme = createTheme({
    status: {
      danger: 'orange',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <HomePage logOut={logOut}/>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;