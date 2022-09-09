import React, { useState, useEffect, lazy, Suspense } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Snackbar from '@mui/material/Snackbar';
import { debounce,http } from 'gra-react-utils';
import {
  MoveToInbox as InboxIcon,
  Menu as MenuIcon, Add as AddIcon, Edit as EditIcon, Quiz as QuizIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import {
  Alert, AppBar, Box, Divider, CssBaseline, Drawer, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Toolbar, Typography
} from '@mui/material';
import lazyLoader from "./utils/LazyLoader";

import {
  BrowserRouter as Router,
  Routes,
  Route,useLocation,
  Link,
  useParams,
  useNavigate,
  useRouteMatch
} from "react-router-dom";

const HomePage = ({logOut}) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const items = [
    {
      text: 'Cuestionarios', icon: <QuizIcon />, path: '/', items: [
        { text: 'Agregar', icon: <AddIcon />, path: '/create' }
      ]
    },
    {
      text: 'Salir', icon: <LogoutIcon />, onClick: () => {
        logOut();
      }
    }
  ]

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {items.map((item, index0) => (
          <React.Fragment key={'List_'+index0} >
            <ListItem>
              <ListItemButton onClick={item.onClick ? item.onClick : () => {
                handleDrawerToggle();
                navigate(item.path);
              }}>
                <ListItemIcon>
                  {item.icon || <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />

              </ListItemButton>
            </ListItem>
            {item.items?.map((item, index) => (
              <ListItem key={'List_'+index0+'_'+index} disablePadding style={{ paddingLeft: '20px' }}>
                <ListItemButton onClick={item.onClick ? item.onClick : () => {
                  handleDrawerToggle();
                  navigate(item.path);
                }}>
                  <ListItemIcon>
                    {item.icon || <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />

                </ListItemButton>
              </ListItem>
            ))}

          </React.Fragment>
        ))}
      </List>
    </div>
  );

  let location = useLocation();

  useEffect(() => {
    const debouncedHandleResize = debounce((width, height) => {
      const header = document.querySelector('.MuiToolbar-root');
      const body = formRef.current;
      body.style.height = (height - header.offsetHeight*0) + 'px';
    });
    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [location,mobileOpen]);


  const [openConfirm, setOpenConfirm] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const drawerWidth = 240;
  const theme = createTheme({
    components: {
      // Name of the component ⚛️
      MuiInput: {
        defaultProps: {
          required: true
        }
      },
    },
  });

  const formRef = React.createRef();

  let navigate = useNavigate();
  const DisabledQuizList = lazyLoader(() => import('./disabledQuiz/List'));
  const DisabledQuizForm = lazyLoader(() => import('./disabledQuiz/Form')
    .then(module => ({ default: module.Form }))
  );

  return (
    <Box
      sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cuestionarios Discapacidad
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box ref={formRef}
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar className="_" />
        <Routes>
          <Route index element={<DisabledQuizList />} />
          <Route path={`/create`} element={<DisabledQuizForm />} />
        </Routes>
      </Box>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Eliminar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancelar</Button>
          <Button onClick={() => {
            setOpenConfirm(false);
            setOpenSnack(true);

          }} autoFocus>
            Si
          </Button>
        </DialogActions>

      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => {
        setOpenSnack(false);
      }}>
        <Alert onClose={() => {
          setOpenSnack(false);
        }} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );

};

export default HomePage;