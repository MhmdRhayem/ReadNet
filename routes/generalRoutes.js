import express from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all genres
router.get('/genres', authenticateToken, async (req, res) => {
    try {
        const [genres] = await db.promise().query('SELECT DISTINCT genre_name FROM genre');
        res.json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ message: 'Error fetching genres' });
    }
});

export default router; 
