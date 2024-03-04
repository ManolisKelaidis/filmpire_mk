import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating, Tooltip } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { ClassNames } from '@emotion/react';
import { selectGenreOrCategory, genreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';

import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';

const Movieinformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  const classes = useStyles();
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
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }}>
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
      </Grid>

    </Grid>
  );
};

export default Movieinformation;
