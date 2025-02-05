import db from '../config/database.js';

class Genre {
    static async findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT DISTINCT genre_id, genre_name FROM Genre';
            db.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async findById(genreId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Genre WHERE genre_id = ?';
            db.query(query, [genreId], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static async create(genreName) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Genre (genre_name) VALUES (?)';
            db.query(query, [genreName], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}