import Book from '../models/Book.js';
import Genre from '../models/Genre.js';
import User from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static HTML pages
export const getReaderHome = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'reader', 'home.html'));
};