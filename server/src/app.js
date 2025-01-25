import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectRouter from './router/router.connect.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(morgan('dev'));

const allowedOrigins = process.env.CLIENT_URL;

app.use(cors({
   origin: function (origin, callback) {
     // Allow requests with no origin (like mobile apps or curl requests)
     if (!origin) return callback(null, true);
 
     if (allowedOrigins?.includes(origin)) {
       callback(null, true);
     } else {
       callback(new Error('Not allowed by CORS'));
     }
   },
   credentials: true, // Allow cookies
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
   allowedHeaders: [
     "Content-Type",
     "Authorization",
     "Accept",
     "Origin",
     "X-Requested-With",
     "Access-Control-Allow-Origin",
     "Access-Control-Allow-Credentials",
     "Access-Control-Allow-Methods",
     "Access-Control-Allow-Headers"
   ],
   exposedHeaders: [
     "Content-Type",
     "Authorization",
     "Access-Control-Allow-Origin",
     "Access-Control-Allow-Credentials",
     "Access-Control-Allow-Methods",
     "Access-Control-Allow-Headers"
   ],
   preflightContinue: false,
   optionsSuccessStatus: 204
 }));
 

// Handle preflight requests for all routes
app.options('*', cors()); // Automatically handles preflight requests


app.use("/api", connectRouter);




app.get('/', (req, res) => {
   res.send('Server is running on port 3000');
});


export default app;