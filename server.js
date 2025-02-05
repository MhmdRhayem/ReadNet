import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Import routes
import authorRoutes from './routes/authorRoutes.js';
import readerRoutes from './routes/readerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import generalRoutes from './routes/generalRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cover_pages', express.static(path.join(__dirname, 'public', 'cover_pages')));
