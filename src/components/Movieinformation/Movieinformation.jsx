import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating, Tooltip } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, TypeSpecimenTwoTone } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ClassNames } from '@emotion/react';
import { MovieList } from '..';
import { selectGenreOrCategory, genreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';

import { useGetMovieQuery, useGetMovieRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import useStyles from './styles';

const Movieinformation = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listname: 'favorite/movies', account_id: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchListMovies } = useGetListQuery({ listname: 'watchlist/movies', account_id: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetMovieRecommendationsQuery({ list: '/recommendations', movie_id: id });

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchListMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchListMovies, data]);
  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prevState) => !prevState);
  };
  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });
    setIsMovieFavorited((prevState) => !prevState);
  };
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something had gone wrong</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ marginBottom: '30px' }}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround} alignItems="center">
          <Box display="flex">

            <Rating readOnly value={data.vote_average / 2} precision={0.2} />

            <Typography align="center" variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average} /10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>

        </Grid>
        <Grid item className={classes.genresContainer} alignItems="center">
          {data?.genres?.map((genre, i) => (
            <Link key={genre.name} className={classes.link} to="/" onClick={() => { dispatch(selectGenreOrCategory(genre.id)); }}>
              <img src={genreIcons[`${genre.name.toLowerCase()}`]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>

          ))}

        </Grid>
        <Typography style={{ marginTop: '10px' }} variant="h5" gutterBottom>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }} gutterBottom>
          {data?.overview}
        </Typography>
        <Typography style={{ marginTop: '10px' }} variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">
                {character.character.split('/')[0]}
              </Typography>
            </Grid>
            )
          )).slice(0, 6)}
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                  <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                  <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                    {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                  </Button>
                  <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                    {isMovieWatchlisted ? 'Unwatchlist' : 'Watchlist'}
                  </Button>
                  <Button sx={{ borderColor: 'primary.main' }} endIcon={<ArrowBack />}>
                    <Typography style={{ textDecoration: 'none' }} component={Link} to="/" variant="subtitle2">
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box />}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>

  );
};

export default Movieinformation;
