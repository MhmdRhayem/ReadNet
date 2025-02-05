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
}