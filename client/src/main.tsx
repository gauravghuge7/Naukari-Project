import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';

import { store } from './redux/Store/Store.ts';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load App
import App  from "./App.tsx"

// Initialize socket and axios
const url = import.meta.env.VITE_SERVER_URL;
export const socket = io(url);
console.log("Socket connection established:", socket);

axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;

// Render the app
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-rzrow7mfr07o2mr2.us.auth0.com"
        clientId="v5iHwgbIZwV1GdeZk8zu7c5dMAYuhHRB"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
          <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
