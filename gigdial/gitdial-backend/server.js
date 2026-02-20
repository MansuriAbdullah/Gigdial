import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Import Routes
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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to Database
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: true,
    credentials: true
}));

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
    console.error('UNCAUGHT EXCEPTION! 💥');
    console.error(err);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥');
    console.error(err);
});

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const port = process.env.PORT || 5000;

// Only listen if not on Vercel
if (!process.env.VERCEL) {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
