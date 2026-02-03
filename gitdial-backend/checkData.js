import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Category from './models/Category.js';
import Conversation from './models/Conversation.js';
import Gig from './models/Gig.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import Wallet from './models/Wallet.js';
import connectDB from './config/db.js';

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();
        const users = await User.countDocuments();
        const categories = await Category.countDocuments();
        const conversations = await Conversation.countDocuments();

        console.log(`Users: ${users}`);
        console.log(`Categories: ${categories}`);
        console.log(`Conversations: ${conversations}`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
