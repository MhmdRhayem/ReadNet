import express from 'express';
import { authenticateToken, authorizeRole, verifyUser } from '../middleware/auth.js';
import * as readerController from '../controllers/readerController.js';

const router = express.Router();

// HTML Routes
router.get('/home.html', 
    authenticateToken, 
    authorizeRole(['reader']),
    readerController.getReaderHome
);

router.get('/book.html', 
    authenticateToken,
    authorizeRole(['reader']),
    readerController.getBookDetails
);

router.get('/savedbooks.html', 
    authenticateToken, 
    authorizeRole(['reader']),
    readerController.getSavedBooks
);

// API Routes ('/api/reader')
router.get('/books', 
    authenticateToken, 
    authorizeRole(['reader']),
    verifyUser,
    readerController.getReaderBooks
);

router.get('/genres',
    authenticateToken,
    authorizeRole(['reader']),
    readerController.getGenres
);

router.get('/book/:book_id/:reader_id', 
    authenticateToken,
    authorizeRole(['reader']),
    verifyUser,
    readerController.getBookDetailsApi
);

router.get('/:reader_id/books',
    authenticateToken,
    authorizeRole(['reader']),
    verifyUser,
    readerController.getReaderBooks
);

router.get('/:reader_id/saved-books',
    authenticateToken,
    authorizeRole(['reader']),
    verifyUser,
    readerController.getSavedBooksApi
);

// Book actions
router.post('/book/add/:book_id/:reader_id',
    authenticateToken,
    authorizeRole(['reader']),
    verifyUser,
    readerController.addBookToReader
);

