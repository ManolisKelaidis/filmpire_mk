import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({

  poster: {
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64,64,70)',
    width: '70%',
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      width: '50%',
      margin: '0 auto',

    },

  },

}));
