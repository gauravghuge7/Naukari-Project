
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';

axios.create({
    // baseURL: 'https://naukari-backend-production.up.railway.app/',
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',      
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Request-Method, Access-Control-Request-Headers',  
        'Access-Control-Allow-Credentials': 'true'
    },
    withCredentials: true

})


createRoot(document.getElementById('root')!).render(

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
)
