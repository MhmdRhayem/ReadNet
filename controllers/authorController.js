import { request } from 'http';
import Book from '../models/Book.js';
import Genre from '../models/Genre.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static HTML pages
export const getAuthorHome = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'author', 'home.html'));
};

export const getAddBookPage = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'author', 'add.html'));
};

export const getEditBookPage = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'author', 'edit.html'));
};
