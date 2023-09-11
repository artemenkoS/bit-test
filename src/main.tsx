import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store.ts';
import { globalStyle } from './app/styles/global.ts';
import { theme } from './app/styles/theme.ts';
import { worker } from './mocks/browser';
import { TaxiOrdering } from './pages/TaxiOrdering/TaxiOrdering.tsx';

worker.start();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles styles={globalStyle} />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TaxiOrdering />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
