import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, numberOfMovies }) => {
  console.log(movies);
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>
      { movies.results.slice(0, numberOfMovies).map((movie, index) => <Movie key={index} movie={movie} i={index} />) }
    </Grid>
  );
};
export default MovieList;
