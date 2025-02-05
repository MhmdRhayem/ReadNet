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