import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { SideBar, Search } from '..';
import useStyles from './styles';
import { fetchToken, createSessionId, moviesApi } from '../../utils';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const [mobileOpen, setmobileOpen] = useState(false);

  const token = localStorage.getItem('request_token');
  const sessionsIdFromLocalStorage = localStorage.getItem('session_id');
  const dispatch = useDispatch();
  // console.log('Navbar information');
  console.log(user);
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionsIdFromLocalStorage) {
          const { data } = await moviesApi.get(`/account?session_id=${sessionsIdFromLocalStorage}`);
          dispatch(setUser(data));
        } else {
          const sessionId = await createSessionId();
          const { data } = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(data));
        }
      }
    };
    logInUser();
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setmobileOpen((preMobileOpen) => !preMobileOpen)}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => { fetchToken(); }}>
                Login &nbsp; <AccountCircle />
              </Button>
            )

              : (
                <Button color="inherit" component={Link} to={`/profile/${user.id}`} onClick={() => {}} className={classes.linkButton}>
                  {!isMobile && <>My movies &nbsp;</>}
                  <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Profile" style={{ width: 30, height: 30 }} />
                </Button>
              )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>

          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              onClose={() => setmobileOpen((preMobileOpen) => !preMobileOpen)}
            >
              <SideBar setmobileOpen={setmobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              open
            >
              <SideBar setmobileOpen={setmobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
