import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const allUsers = await User.find({}).select('role');
        console.log('User Roles:', allUsers.map(u => u.role));

        const allOrders = await Order.find({}).select('status isPaid');
        console.log('Orders:', allOrders);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connect();
