import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { SideBar } from '..';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const [mobileOpen, setmobileOpen] = useState(false);
  const isAuthenticated = true;

  console.log('Navbar information');
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => {}}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            )

              : (
                <Button color="inherit" component={Link} to="/profile/:id" onClick={() => {}} className={classes.linkButton}>
                  {!isMobile && <>My movies &nbsp;</>}
                  <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Profile" style={{ width: 30, height: 30 }} />
                </Button>
              )}
          </div>
          {!isMobile && 'Search...'}

        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>

          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
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