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

export const getBookDetails = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'reader', 'book.html'));
};

export const getSavedBooks = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'reader', 'savedbooks.html'));
};

// API endpoints
export const getReaderBooks = async (req, res) => {
    try {
        const readerId = req.params.reader_id;
        const allBooks = await Book.findAll();
        const genres = await Genre.findAll();
        const readerBooks = await User.getReaderBooks(readerId);
        const readerBookIds = readerBooks.map(book => book.book_id);

        const booksByGenre = genres.reduce((acc, genre) => {
            acc[genre.genre_name] = allBooks.filter(book => book.genre_id === genre.genre_id);
            return acc;
        }, {});

        res.status(200).json({
            booksByGenre,
            readerBookIds
        });
    } catch (err) {
        console.error('Error in getReaderBooks:', err);
        res.status(500).json({ message: 'Error getting reader books' });
    }
};

export const getBookDetailsApi = async (req, res) => {
    try {
        const { book_id, reader_id } = req.params;
        const book = await Book.findById(book_id);
        const genre = await Genre.findById(book.genre_id);
        const readerBooks = await User.getReaderBooks(reader_id);
        const isSaved = readerBooks.some(b => b.book_id === book.book_id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            ...book,
            genre_name: genre.genre_name,
            is_saved: isSaved
        });
    } catch (err) {
        console.error('Error in getBookDetailsApi:', err);
        res.status(500).json({ message: 'Error getting book details' });
    }
};

export const addBookToReader = async (req, res) => {
    try {
        const { reader_id, book_id } = req.params;
        await User.addBookToReader(reader_id, book_id);
        res.status(200).json({ message: 'Book added successfully' });
    } catch (err) {
        console.error('Error in addBookToReader:', err);
        res.status(500).json({ message: 'Error adding book to reader' });
    }
};

export const removeBookFromReader = async (req, res) => {
    try {
        const { reader_id, book_id } = req.params;
        await User.removeBookFromReader(reader_id, book_id);
        res.status(200).json({ message: 'Book removed successfully' });
    } catch (err) {
        console.error('Error in removeBookFromReader:', err);
        res.status(500).json({ message: 'Error removing book from reader' });
    }
};

export const getSavedBooksApi = async (req, res) => {
    try {
        const reader_id = req.params.reader_id;
        const savedBooks = await Book.findByReaderId(reader_id);
        const genres = await Genre.findAll();

        // Make sure savedBooks is an array
        const savedBooksArray = Array.isArray(savedBooks) ? savedBooks : [];

        const booksByGenre = {};
        genres.forEach(genre => {
            const booksInGenre = savedBooksArray.filter(book => book.genre_id === genre.genre_id);
            if (booksInGenre.length > 0) {
                booksByGenre[genre.genre_name] = booksInGenre;
            }
        });

        res.status(200).json(booksByGenre);
    } catch (err) {
        console.error('Error in getSavedBooksApi:', err);
        res.status(500).json({ message: 'Error getting saved books' });
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
