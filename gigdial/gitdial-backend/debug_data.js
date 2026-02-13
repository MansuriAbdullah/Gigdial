import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const totalUsers = await User.countDocuments();
        console.log('Total Users:', totalUsers);

        const customers = await User.countDocuments({ role: 'customer' });
        console.log('Customers:', customers);

        const workers = await User.countDocuments({ role: 'worker' });
        console.log('Workers:', workers);

        const orders = await Order.find({});
        console.log('Total Orders:', orders.length);

        const activeBookings = orders.filter(o =>
            ['pending', 'active', 'in-progress'].includes(o.status)
        ).length;
        console.log('Active Bookings:', activeBookings);

        const paidOrders = orders.filter(o => o.isPaid);
        console.log('Paid Orders:', paidOrders.length);

        const totalRevenue = paidOrders.reduce((acc, order) => acc + (order.price || 0), 0);
        console.log('Total Revenue:', totalRevenue);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connect();
