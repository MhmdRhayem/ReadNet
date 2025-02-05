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

    static async findByAuthorId(authorId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Book WHERE author_id = ?';
            db.query(query, [authorId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async findByReaderId(readerId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT b.* 
                FROM Book b
                JOIN reader_book rb ON b.book_id = rb.book_id
                WHERE rb.reader_id = ?
            `;
            db.query(query, [readerId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async create(bookData) {
        return new Promise((resolve, reject) => {
            const { title, genre_id, published_date, author_id, bio, cover_page } = bookData;
            let insertFields = 'title, genre_id, published_date, author_id, bio';
            let insertValues = [title, genre_id, published_date || null, author_id, bio];
            
            if (cover_page) {
                insertFields += ', cover_page';
                insertValues.push(cover_page);
            }

            const query = `INSERT INTO Book (${insertFields}) VALUES (${insertValues.map(() => '?').join(',')})`;
            db.query(query, insertValues, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async update(bookId, bookData) {
        return new Promise((resolve, reject) => {
            const { title, genre_idd, publication_date, description, cover_page_url } = bookData;
            let updateFields = 'title = ?, genre_id = ?, published_date = ?, bio = ?';
            let updateValues = [title, genre_idd, publication_date , description];

            if (cover_page_url) {
                updateFields += ', cover_page = ?';
                updateValues.push(cover_page_url);
            }

            updateValues.push(bookId);
            const query = `UPDATE Book SET ${updateFields} WHERE book_id = ?`;
            db.query(query, updateValues, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async delete(bookId, authorId) {
        return new Promise((resolve, reject) => {
            // First delete from reader_book table
            db.query('DELETE FROM Reader_Book WHERE book_id = ?', [bookId], (err) => {
                if (err) reject(err);

                // Then delete from book table
                db.query('DELETE FROM Book WHERE book_id = ? AND author_id = ?', [bookId, authorId], (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }

    static async findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Book';
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

export default Book; 