import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

//Dark theme
const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('disq')
);
