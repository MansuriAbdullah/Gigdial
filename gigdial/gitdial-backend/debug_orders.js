import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';

dotenv.config();

const checkOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const orders = await Order.find({});
        console.log('Orders found:', orders.length);
        orders.forEach(o => {
            console.log(`Order ID: ${o._id}, Status: '${o.status}', Type: ${typeof o.status}, Matches Pending: ${o.status === 'pending'}`);
        });

        const count = await Order.countDocuments({ status: 'pending' });
        console.log('DB Count pending:', count);

        const countIn = await Order.countDocuments({ status: { $in: ['pending', 'active', 'in-progress'] } });
        console.log('DB Count IN:', countIn);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkOrders();
