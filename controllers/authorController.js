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

// API endpoints 
export const getAuthorBooks = async (req, res) => {
    try {
        const authorId = req.params.author_id;
        const books = await Book.findByAuthorId(authorId);
        const genres = await Genre.findAll();
        const booksByGenre = genres.map(genre => {
            const filteredBooks = books.filter(book => book.genre_id === genre.genre_id);
            return {
            genre: genre.genre_name,
            books: filteredBooks
            };
        }).filter(item => item.books.length > 0);
        res.status(200).json({ booksByGenre });
    } catch (err) {
        console.error('Error in getAuthorBooks:', err);
        res.status(500).json({ message: 'Error getting author books' });
    }
};

export const getBookDetails = async (req, res) => {
    try {
        const { book_id } = req.params;
        const book = await Book.findById(book_id);
        const genre = await Genre.findById(book.genre_id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Combine book data with genre name
        const bookWithGenre = {
            ...book,
            genre_name: genre.genre_name
        };

        res.status(200).json(bookWithGenre);
    } catch (err) {
        console.error('Error in getBookDetails:', err);
        res.status(500).json({ message: 'Error getting book details' });
    }
};

export const getGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.status(200).json(genres);
    } catch (err) {
        console.error('Error in getGenres:', err);
        res.status(500).json({ message: 'Error getting genres' });
    }
};

export const addBook = async (req, res) => {
    try {
        const { title, genre_name, published_date, bio, cover_page } = req.body;
        const author_id = req.user.id;
        console.log(author_id)
        const genre_id = await Genre.findIdByName(genre_name);
        const result = await Book.create({
            title,
            genre_id,
            published_date,
            author_id,
            cover_page,
            bio,
            
        });

        res.status(201).json({ message: 'Book added successfully', book_id: result.insertId });
    } catch (err) {
        console.error('Error in addBook:', err);
        res.status(500).json({ message: 'Error adding book' });
    }
};