import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';

dotenv.config();

const updateOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // Force update all 'pending' status strings to 'pending' to clear any whitespace or case issues
        const result = await Order.updateMany(
            {},
            { $set: { status: 'pending' } }
        );
        console.log('Updated:', result);

        const orders = await Order.find({});
        console.log('Orders now:', orders.map(o => o.status));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateOrders();
