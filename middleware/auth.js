import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user) => {
    try {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
    } catch (error) {
        console.error('Token generation error:', error);
        throw error;
    }
};

export const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.log('No token found');
            return res.redirect('/login');
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.redirect('/login');
            }
            console.log("Token verified:\n",decoded)
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return res.redirect('/login');
    }
};

export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
