
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';
// import {io} from "socket.io-client";
import { store } from './Redux/Store/Store.ts';
import { Provider } from 'react-redux';


const url = import.meta.env.VITE_SERVER_URL;


axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;




createRoot(document.getElementById('root')!).render(

    <Provider store={store}> 
        <BrowserRouter>
            <Auth0Provider
                domain="dev-rzrow7mfr07o2mr2.us.auth0.com"
                clientId="v5iHwgbIZwV1GdeZk8zu7c5dMAYuhHRB"
                authorizationParams={{
                redirect_uri: window.location.origin
                }}
            >
                <App />
                
            </Auth0Provider>
            
        </BrowserRouter>
    </Provider>
)
