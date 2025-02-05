import express from 'express';
import { authenticateToken, authorizeRole, verifyUser } from '../middleware/auth.js';
import * as authorController from '../controllers/authorController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/cover_pages/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// HTML Routes
router.get('/home.html', 
    authenticateToken, 
    authorizeRole(['author']),
    verifyUser,
    authorController.getAuthorHome
);

router.get('/add.html', 
    authenticateToken,
    authorizeRole(['author']),
    authorController.getAddBookPage
);

router.get('/edit.html', 
    authenticateToken,
    authorizeRole(['author']),
    authorController.getEditBookPage
);

// API Routes ('/api/author')
router.get('/:author_id/books', 
    authenticateToken, 
    authorizeRole(['author']),
    verifyUser, 
    authorController.getAuthorBooks
);

router.get('/books/:book_id',
    authenticateToken,
    authorizeRole(['author']),
    authorController.getBookDetails
);

router.get('/genres',
    authenticateToken,
    authorizeRole(['author']),
    authorController.getGenres
);