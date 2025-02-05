import db from '../config/database.js';

class Book {
    static async findById(bookId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT Book.*, Genre.genre_name, Author.name as author_name 
                FROM Book 
                JOIN Genre ON Book.genre_id = Genre.genre_id 
                JOIN Author ON Book.author_id = Author.author_id 
                WHERE Book.book_id = ?
            `;
            db.query(query, [bookId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}