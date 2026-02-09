import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    // Check for token in cookies first
    token = req.cookies.jwt;

    // If not in cookies, check Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    console.log('=== ADMIN MIDDLEWARE ===');
    console.log('User:', req.user?.email);
    console.log('Is Admin:', req.user?.isAdmin);

    if (req.user && req.user.isAdmin) {
        console.log('Admin check passed');
        next();
    } else {
        console.log('Admin check failed');
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

export { protect, admin };