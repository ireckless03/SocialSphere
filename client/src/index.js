// Importing necessary React and ReactDOM modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main styling for the application
import './index.css';

// Importing the main App component
import App from './App';

// Importing the authentication reducer from the 'state' file
import authReducer from './state';

// Importing necessary Redux and Redux Persist modules
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Importing the Provider and PersistGate from react-redux and redux-persist
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Configuration for Redux Persist
const persistConfig = { key: 'root', storage, version: 1 };

// Creating a persisted reducer using the authReducer and persistConfig
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configuring the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignoring specific actions for Redux Persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating a root for rendering React content
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the main application wrapped with Redux Provider and PersistGate
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate waits for Redux state to be hydrated from storage */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
