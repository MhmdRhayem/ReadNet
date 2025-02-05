import db from '../config/database.js';

class User {
    static findAuthorByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM author WHERE email = ?';
            db.query(query, [email], (err, results) => { // Changed parameter to 'results'
                if (err) {
                    console.error("Database error:", err); // Added error logging
                    return reject(err);
                }
                resolve(results.length > 0 ? results[0] : null);
            });
        });
    }

    static findReaderByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM reader WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }

    static createAuthor(authorData) {
        return new Promise((resolve, reject) => {
            const { name, email, password } = authorData;
            const query = 'INSERT INTO Author (name, email, password) VALUES (?, ?, ?)';
            db.query(query, [name, email, password], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static createReader(readerData) {
        return new Promise((resolve, reject) => {
            const { name, email, password } = readerData;
            const query = 'INSERT INTO Reader (name, email, password) VALUES (?, ?, ?)';
            db.query(query, [name, email, password], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static findAuthorById(authorId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Author WHERE author_id = ?';
            db.query(query, [authorId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }

    static findReaderById(readerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Reader WHERE reader_id = ?';
            db.query(query, [readerId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }

    static addBookToReader(readerId, bookId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO reader_book (reader_id, book_id) VALUES (?, ?)';
            db.query(query, [readerId, bookId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static removeBookFromReader(readerId, bookId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM reader_book WHERE reader_id = ? AND book_id = ?';
            db.query(query, [readerId, bookId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static getReaderBooks(readerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT book_id FROM Book WHERE book_id IN (SELECT book_id FROM reader_book WHERE reader_id = ?)';
            db.query(query, [readerId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
}