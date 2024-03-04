import React, { useEffect } from 'react';
// userSelector gives as acces to a specific state(we have user,genreOrCategory) check folder features
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';

const Profile = () => {
  // get the user stored inside the state using useSelector hook
  const { user } = useSelector((state) => state.user);
  const favoriteMovies = false;
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  console.log(user);
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length
        ? <Typography variant="h5">Add movies to yout watchlist</Typography>
        : (
          <Box>
            Favorite Movies
          </Box>
        )}

    </Box>
  );
};

export default Profile;
