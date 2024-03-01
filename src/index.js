import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
// const App = () => <div>Hello </div>;
import store from './app/store.js';

const theme = createTheme({});
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter> <App /></BrowserRouter>
    </ThemeProvider>
  </Provider>,

  document.getElementById('root'),
);
