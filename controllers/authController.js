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
        } else if (role === 'reader') {
            // Check if email exists in Author table
            const existingAuthor = await User.findAuthorByEmail(email);
            if (existingAuthor) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const reader = await User.createReader({ name, email, password: hashedPassword });
            const token = generateToken({
                id: reader.insertId,
                email: email,
                role: 'reader'
            });

            res.status(201).json({ 
                message: 'Reader account created successfully',
                token,
                user: {
                    id: reader.insertId,
                    name: name,
                    email: email,
                    role: 'reader'
                }
            });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Error creating account' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const author = await User.findAuthorByEmail(email);
        if (author) {
            const isMatch = password === author.password; 
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = generateToken({
                id: author.author_id,
                email: author.email,
                role: 'author'
            });

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // use secure cookies in production
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
            
            return res.status(200).json({
                token,
                user: {
                    id: author.author_id,
                    name: author.name,
                    email: author.email,
                    role: 'author'
                }
            });
        }
        // Check Reader table
        const reader = await User.findReaderByEmail(email);
        if (!reader) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = password === reader.password; // No hashing for now
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({
            id: reader.reader_id,
            email: reader.email,
            role: 'reader'
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            token,
            user: {
                id: reader.reader_id,
                name: reader.name,
                email: reader.email,
                role: 'reader'
            }
        });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Error logging in' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};