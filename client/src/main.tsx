
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';


axios.create({
    baseURL: 'http://localhost:5000',
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

        <App />
    </BrowserRouter>
)
