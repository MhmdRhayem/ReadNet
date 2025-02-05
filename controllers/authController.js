import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
};

export const getSignupPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Name, email, password, and role are required' });
        }

        const hashedPassword = password; // No hashing for now

        if (role === 'author') {
            // Check if email exists in Reader table
            const existingReader = await User.findReaderByEmail(email);
            if (existingReader) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const author = await User.createAuthor({ name, email, password: hashedPassword });
            const token = generateToken({
                id: author.insertId,
                email: email,
                role: 'author'
            });

            res.status(201).json({ 
                message: 'Author account created successfully',
                token,
                user: {
                    id: author.insertId,
                    name: name,
                    email: email,
                    role: 'author'
                }
            });
        } 
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Error creating account' });
    }
};