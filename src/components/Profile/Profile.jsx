import React, { useEffect } from 'react';
// userSelector gives as acces to a specific state(we have user,genreOrCategory) check folder features
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

const Profile = () => {
  // get the user stored inside the state using useSelector hook
  const { user } = useSelector((state) => state.user);

  const { data: favoriteMovies, refetch: refetchFavorited } = useGetListQuery({ listname: 'favorite/movies', account_id: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchListMovies, refetch: refetchWatchListed } = useGetListQuery({ listname: 'watchlist/movies', account_id: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorited();
    refetchWatchListed();
  }, []);

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
      {!favoriteMovies?.results?.length && !watchListMovies?.results?.length
        ? <Typography variant="h5">Add movies to yout watchlist</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist Movies" data={watchListMovies} />
          </Box>
        )}

    </Box>
  );
};

export default Profile;
