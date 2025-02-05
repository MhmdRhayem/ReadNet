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

// Routes
app.get('/', (req, res) => {
    res.redirect('/login');
});

// API Routes
app.use('/api/author', authorRoutes);
app.use('/api/reader', readerRoutes);
app.use('/api', authRoutes);
app.use('/api', generalRoutes);  // Mount general routes at /api

// HTML Routes
app.use('/', authRoutes);  // For login and signup pages
app.get('/author/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'author', path.basename(req.path)));
});
app.get('/reader/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reader', path.basename(req.path)));
});

// Error handling for API routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
