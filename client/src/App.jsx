/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import Router from './Routes';
import store, { persistor } from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;
