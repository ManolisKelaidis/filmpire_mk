import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // Get Movies by [TYPE]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get search query

        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get movues by category
        if (genreIdOrCategoryName && typeof (genreIdOrCategoryName) === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        // get Movies bu genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          console.log('here2');
          return `discover/movie?with_genres=${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }
      ,
    }),
    // Get Movie
    getMovie: builder.query({

      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    getMovieRecommendations: builder.query({
      query: ({ list, movie_id }) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
    getActorDetails: builder.query({
      query: (actor_id) => `person/${actor_id}?api_key=${tmdbApiKey}`,
    }),
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesByActorIdQuery,
  useGetActorDetailsQuery,
  useGetMovieRecommendationsQuery,
  useGetMovieQuery,
  useGetMoviesQuery,
  useGetGenresQuery,
} = tmdbApi;
