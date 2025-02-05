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

    static async update(genreId, genreName) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Genre SET genre_name = ? WHERE genre_id = ?';
            db.query(query, [genreName, genreId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async delete(genreId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Genre WHERE genre_id = ?';
            db.query(query, [genreId], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    static async findIdByName(genreName) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT genre_id FROM Genre WHERE genre_name = ?';
            db.query(query, [genreName], (err, results) => {
                if (err) reject(err);
                resolve(results[0]?.genre_id);
            });
        });
    }
}