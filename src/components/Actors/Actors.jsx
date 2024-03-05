import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { Grid, Typography, Button, ButtonGroup, CircularProgress, Box } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles.js';
import MovieList from '../MovieList/MovieList.jsx';
import Pagination from '../Pagination/Pagination.jsx';

const Actors = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const { data: actor_details, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: actor_recommendations, isFetching: actor_recommendationsIsFetching } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  return (

    <Grid container spacing={3}>
      <Grid item sm={12} lg={5}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${actor_details?.profile_path}`}
          alt={actor_details?.name}
        />
      </Grid>
      <Grid style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} item container lg={7}>
        <Typography variant="h2" gutterBottom>
          {actor_details?.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Born: {new Date(actor_details?.birthday).toDateString()}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {actor_details?.biography}
        </Typography>
        <Grid marginTop="2rem" container item justifyContent="space-around">
          <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${actor_details?.imdb_id}`}>
            IMDB
          </Button>
          <Button sx={{ borderColor: 'primary.main' }} startIcon={<ArrowBack />}>
            <Typography style={{ textDecoration: 'none' }} component={Link} to="/" variant="subtitle2">
              Back
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid marginTop="2rem" container display="flex" justifyContent="center">
        <Typography marginBottom="1em" align="center" variant="h2">Movies</Typography>
        {actor_recommendations && <MovieList movies={actor_recommendations} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={actor_recommendations?.total_pages} />
      </Grid>

    </Grid>

  );
};

export default Actors;
