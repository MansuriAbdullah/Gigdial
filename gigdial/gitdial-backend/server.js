import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration (adjust origin as needed)
app.use(cors({
    origin: true, // Allow all origins in production, or set to your Vercel URL
    credentials: true
}));

import userRoutes from './routes/userRoutes.js';
import gigRoutes from './routes/gigRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import disputeRoutes from './routes/disputeRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import withdrawalRoutes from './routes/withdrawalRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

// Routes
app.get('/api/test', (req, res) => res.json({ message: 'Backend is alive' }));

app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/disputes', disputeRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Uncaught exceptions logging
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
});

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handling middleware (basic)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
