import { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useFormState } from 'gra-react-utils';
import {
  Button, Divider, TextField, InputAdornment, IconButton, Grid, Tabs, Tab
} from '@mui/material';
import { Visibility, VisibilityOff, Google, LinkedIn } from "@mui/icons-material";
//https://blog.logrocket.com/guide-adding-google-login-react-app/
//  cookiePolicy={'single_host_origin'}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {children}
    </div>
  );
}

export const Login = function ({setToken}) {

  const [o, { defaultProps }] = useFormState(useState);
  const [register,registerForm] = useFormState(useState);
  const registerProps=registerForm.defaultProps;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [profile, setProfile] = useState(false);
  const onSuccess = function (e) {
    setProfile(e.profileObj);
  }
  const onError = function (e) {
    console.log(e);
  }

  const logOut = function (e) {
    setProfile(null);
  }

  const loginOnClick=function(e){
    setToken({token:'12345'});
    //window.location.reload(false);
  }

  //uxMode='redirect'
  //redirectUri="http://localhost:3000"
  const styles = {
    base: {
      color: 'white',
      padding: '10px 20px',
      textTransform: 'unset',
      width: "-webkit-fill-available",
      textAlign: 'left',
      justifyContent: "flex-start",
      marginTop: 20
    },
    google: {
      backgroundColor: '#db4c3f'
    },
    linkedin: {
      backgroundColor: '#117cb4'
    }
  };
  const [value, setValue] = useState(0);
  const tabOnChange = (event, newValue) => {
    setValue(newValue);
  };
  const bolder = { fontWeight: 'bolder' };
  return <div style={{ overflow: 'auto', padding: 20, objectFit: 'cover', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url(http://web.regionancash.gob.pe/fs/images/background/PLAZA_MAYOR_DE_NUEVO_CHIMBOTE_Y_CATEDRAL.JPG)', backgroundColor: '#000000', height: "-webkit-fill-available", justifyContent: "center" }}><div
    style={{ borderRadius: '10px 10px 0 0', margin: 'auto', border: '1px solid #bfbfbf', backgroundColor: '#ffffff', maxWidth: 360, width: "-webkit-fill-available" }}>
    {!profile ? <form>

      <div className="x-simple-header" style={{ borderRadius: '10px 10px 0 0', padding: 20, textAlign: 'center', backgroundColor: '#0f62ac' }}>
        <a>
          <img height="80" alt="Gobierno Regional de Ancash" className="ui-banner-login" src="http://web.regionancash.gob.pe/fs/images/logo2018.png" />
        </a>
      </div>

      <Tabs value={value} onChange={tabOnChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example">
        <Tab label="Iniciar Session" style={value === 0 ? bolder : {}} />
        <Tab label="Registrate" style={value === 1 ? bolder : {}} />
      </Tabs>

      <div style={{ padding: 20, textAlign: 'center' }}>
        <TabPanel value={value} index={0} >
          <TextField
            label="Usuario"

            className='noMarginTop'
            {...defaultProps('name')}
            style={{ marginTop: '0px !important' }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            {...defaultProps("pass")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ display: o.pass?.length > 0 ? '' : 'none' }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <div style={{ textAlign: 'left', paddingTop: 20 }}>
            <a href="/" className="login-link">¿Has olvidado tu contraseña?</a>
          </div>
          <Button onClick={loginOnClick} style={{ ...styles.base, textAlign: 'center', justifyContent: "center", backgroundColor: '#b71212' }}>Iniciar Sessión</Button>
        </TabPanel>
        <TabPanel value={value} index={1} >

          <TextField
            label="Usuario"

            className='noMarginTop'
            {...registerProps('name')}
            style={{ marginTop: '0px !important' }}
          />
          <TextField
            label="Correo Electronico"
            {...registerProps('mail')}
            style={{ marginTop: '0px !important' }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            {...registerProps("pass")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ display: o.pass?.length > 0 ? '' : 'none' }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Confirmar Contraseña"
            {...defaultProps("confirm")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ display: o.pass?.length > 0 ? '' : 'none' }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button style={{ ...styles.base, textAlign: 'center', justifyContent: "center", backgroundColor: '#b71212' }}>Registrarme</Button>

        </TabPanel>
        <Divider style={{ marginTop: 20 }}><span style={{ color: 'gray' }}>o usar</span></Divider>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <GoogleLogin
              clientId={process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onError}
              render={renderProps => (
                <Button startIcon={<Google />} onClick={renderProps.onClick} style={{ ...styles.base, ...styles.google }}>Google</Button>
              )}
              isSignedIn={false}

            /></Grid>
          <Grid item xs={6}>
            <Button startIcon={<LinkedIn />} style={{ ...styles.base, ...styles.linkedin }}>Linkedin</Button></Grid>
        </Grid>
        <div style={{ fontSize: '14px', marginTop: 20, color: '#d82f4b' }}>Sub Gerencia de Tecnologia de Información e Innovacion - SGTII</div>
      </div></form> : <GoogleLogout clientId={process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Log out" onLogoutSuccess={logOut} />
    }</div></div>

};

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const logOut = userToken => {
    localStorage.removeItem('token');
    setToken(null);
    //window.location.reload(false);
  };

  return {
    setToken: saveToken,
    token,
    logOut
  }
}