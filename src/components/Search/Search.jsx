import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useStyles from './styles';

const Search = () => {
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      Search
    </div>
  );
};
export default Search;
