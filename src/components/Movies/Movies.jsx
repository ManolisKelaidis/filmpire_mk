import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  console.log(data, 'asdasddas');
  if (isFetching) {
    return (
      <Box diplay="flex" justifyContent="center">

        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box diplay="flex" justifyContent="center">

        <Typography variant="h4">No Movies that match</Typography>

      </Box>
    );
  }
  if (error) {
    return (
      <Box diplay="flex" justifyContent="center">

        <Typography variant="h4">No Movies thatasdasd match</Typography>

      </Box>
    );
  }
  return (
    <div>
      <MovieList movies={data} />

    </div>
  );
};

export default Movies;
