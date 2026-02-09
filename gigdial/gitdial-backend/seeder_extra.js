import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Conversation from './models/Conversation.js';
import connectDB from './config/db.js';

dotenv.config();

const seedExtra = async () => {
    try {
        await connectDB();

        const users = await User.find({});
        if (users.length < 2) {
            console.log('Not enough users to create conversation.');
            process.exit(1);
        }

        const user1 = users[1]; // Provider
        const user2 = users[4]; // Customer

        // Check if conversation exists
        let convo = await Conversation.findOne({
            members: { $all: [user1._id, user2._id] }
        });

        if (!convo) {
            console.log('Creating Conversation...');
            convo = await Conversation.create({
                members: [user2._id, user1._id],
                lastMessage: 'Hello, I have a question about your gig.',
                isRead: false
            });
            console.log('Conversation created.');
        } else {
            console.log('Conversation already exists.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedExtra();
