import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { tmdbApi } from '../services/TMDB';

console.log(tmdbApi.reducerPath, tmdbApi.reducer);
const store = configureStore({

  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
setupListeners(store.dispatch);
export default store;
