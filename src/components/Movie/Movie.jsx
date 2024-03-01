import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';

import { Link } from 'react-router-dom';
import useStyles from './styles';

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  console.log(classes.image);

  return (
    <Grid item xs={12} sm={6} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1 * 2000)}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.image}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://wwwfillmurray.com/200/300'}
          />
          <Typography variant="h5" className={classes.title}>{movie.title}</Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average}/10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.2} />
            </div>
          </Tooltip>

        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
