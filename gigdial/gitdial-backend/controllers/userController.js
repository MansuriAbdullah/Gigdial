import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Wallet from '../models/Wallet.js';
import Notification from '../models/Notification.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Verify role
            const userRole = user.role || 'customer';
            const requestedRole = role || 'customer';

            if (userRole !== requestedRole && !user.isAdmin) {
                res.status(401);
                throw new Error(`Profile not found for this email address as a ${requestedRole}`);
            }
            if (user.isBlocked) {
                res.status(403);
                throw new Error('Your account has been blocked. Please contact support.');
            }

            const token = generateToken(res, user._id);

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isProvider: user.isProvider,
                role: user.role,
                profileImage: user.profileImage,
                phone: user.phone,
                city: user.city,
                isApproved: user.isApproved,
                token
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, city, address, skills, role, category, mainCategory, serviceType, experience, serviceDescription, dob, languages } = req.body;

        // Parse JSON strings if necessary (common with FormData)
        const processedSkills = typeof skills === 'string' ? JSON.parse(skills) : (skills || []);
        const processedLanguages = typeof languages === 'string' ? JSON.parse(languages) : (languages || []);

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            city,
            address,
            skills: role === 'worker' ? processedSkills : undefined,
            category: role === 'worker' ? category : undefined,
            mainCategory: role === 'worker' ? mainCategory : undefined,
            serviceType: serviceType || 'Residency',
            experience: role === 'worker' ? experience : 0,
            serviceDescription: role === 'worker' ? serviceDescription : undefined,
            dob: role === 'worker' ? dob : undefined,
            languages: role === 'worker' ? processedLanguages : undefined,
            role: role || 'customer',
            isProvider: role === 'worker',
            profileImage: req.files?.profileImage?.[0]
                ? `data:${req.files.profileImage[0].mimetype};base64,${req.files.profileImage[0].buffer.toString('base64')}`
                : undefined,
            aadhaarCard: req.files?.aadhaarCard?.[0]
                ? `data:${req.files.aadhaarCard[0].mimetype};base64,${req.files.aadhaarCard[0].buffer.toString('base64')}`
                : undefined,
            panCard: req.files?.panCard?.[0]
                ? `data:${req.files.panCard[0].mimetype};base64,${req.files.panCard[0].buffer.toString('base64')}`
                : undefined
        });

        if (user) {
            // Create wallet for user
            await Wallet.create({ user: user._id, balance: 0 });

            const token = generateToken(res, user._id);

            // Send Emails in background (No await to keep response fast)
            (async () => {
                try {
                    const message = `Welcome to GigDial, ${user.name}! \n\nWe are excited to have you as a ${user.role} on our platform. Find services or list your expertise instantly. \n\nBest Regards,\nTeam GigDial`;
                    const html = `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="https://i.ibb.co/Xz9kXkX/logo-png.png" alt="GigDial" style="height: 60px;">
                            </div>
                            <h2 style="color: #0f172a; font-size: 24px;">Welcome to GigDial, ${user.name}!</h2>
                            <p style="color: #475569; line-height: 1.6;">We are excited to have you as a <strong>${user.role}</strong> on our platform. Whether you're looking for expert help or offering your services, we're here to help you get the job done.</p>
                            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;">
                            <p style="color: #64748b; font-size: 14px;">If you have any questions, feel free to reply to this email.</p>
                            <p style="color: #0f172a; font-weight: bold; margin-top: 24px;">Best Regards,<br>Team GigDial</p>
                        </div>
                    `;

                    console.log(`[Email] Attempting welcome mail to: ${user.email}`);
                    await sendEmail({
                        email: user.email,
                        subject: 'Welcome to GigDial!',
                        message,
                        html
                    });
                    console.log(`✔ [Email] User mail sent: ${user.email}`);

                    // Admin Notification (Sending to self as alert)
                    const adminMail = process.env.EMAIL_USER;
                    const adminMessage = `New ${user.role} Registered! \nName: ${user.name} \nEmail: ${user.email} \nPhone: ${user.phone}`;
                    await sendEmail({
                        email: adminMail,
                        subject: `New ${user.role} Alert: ${user.name}`,
                        message: adminMessage,
                        html: `
                            <div style="font-family: sans-serif; background: #f8fafc; padding: 20px;">
                                <h2 style="color: #1e293b;">New ${user.role.toUpperCase()} Joined GigDial!</h2>
                                <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                                    <p><strong>Name:</strong> ${user.name}</p>
                                    <p><strong>Email:</strong> ${user.email}</p>
                                    <p><strong>Phone:</strong> ${user.phone}</p>
                                    <p><strong>City:</strong> ${user.city}</p>
                                </div>
                            </div>
                        `
                    });
                    console.log(`✔ [Email] Admin notification sent to ${adminMail}`);
                } catch (err) {
                    console.error(`✘ [Email] Critical Error:`, err);
                }
            })();

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isProvider: user.isProvider,
                role: user.role,
                phone: user.phone,
                city: user.city,
                token
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User logged out' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.city = req.body.city !== undefined ? req.body.city : user.city;
        user.address = req.body.address !== undefined ? req.body.address : user.address;
        user.serviceDescription = req.body.serviceDescription !== undefined ? req.body.serviceDescription : user.serviceDescription;
        user.skills = req.body.skills !== undefined ? req.body.skills : user.skills;
        user.profileImage = req.body.profileImage || user.profileImage;

        if (req.file) {
            user.profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            city: updatedUser.city,
            address: updatedUser.address,
            serviceDescription: updatedUser.serviceDescription,
            skills: updatedUser.skills,
            profileImage: updatedUser.profileImage
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get all workers
// @route   GET /api/users/workers
// @access  Public
const getWorkers = async (req, res) => {
    try {
        const workers = await User.find({
            role: 'worker'
        }).select('-password');
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get worker by ID
// @route   GET /api/users/workers/:id
// @access  Public
const getWorkerById = async (req, res) => {
    try {
        const worker = await User.findById(req.params.id).select('-password');

        if (worker && worker.role === 'worker') {
            // Get worker's reviews
            const reviews = await Review.find({ worker: worker._id })
                .populate('reviewer', 'name profileImage')
                .sort({ createdAt: -1 })
                .limit(10);

            res.json({
                ...worker.toObject(),
                reviews
            });
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get worker dashboard stats
// @route   GET /api/users/worker/dashboard/:id
// @access  Private
const getWorkerDashboardStats = async (req, res) => {
    try {
        const userId = req.params.id;

        // 1. Total Earnings
        const completedOrders = await Order.find({
            seller: userId,
            status: 'completed'
        });
        const totalEarnings = completedOrders.reduce((sum, order) => sum + order.price, 0);

        // 2. Active Leads (pending orders)
        const activeLeads = await Order.countDocuments({
            seller: userId,
            status: { $in: ['pending', 'requested'] }
        });

        // 3. Response Rate (simplified - percentage of accepted vs total orders)
        const totalOrders = await Order.countDocuments({ seller: userId });
        const acceptedOrders = await Order.countDocuments({
            seller: userId,
            status: { $in: ['in-progress', 'active', 'completed', 'approved'] }
        });
        const responseRate = totalOrders > 0 ? ((acceptedOrders / totalOrders) * 100).toFixed(1) : 0;

        // 4. Rating (Use the rating from User model which is updated on review submission)
        const user = await User.findById(userId);
        const rating = user.rating || 0;

        // Fetch Wallet Balance
        const wallet = await Wallet.findOne({ user: userId });
        const walletBalance = wallet ? wallet.balance : 0;

        // 5. Recent Orders/Opportunities (pending or requested)
        const opportunities = await Order.find({
            seller: userId,
            status: { $in: ['pending', 'requested'] }
        })
            .populate('buyer', 'name profileImage city')
            .sort({ createdAt: -1 })
            .limit(5);

        // 6. Leaderboard (top 5 workers by rating)
        const leaderboard = await User.find({ role: 'worker', isApproved: true })
            .sort({ rating: -1, numReviews: -1 })
            .limit(5)
            .select('name profileImage rating numReviews city');

        // 7. Recent Reviews
        const recentReviews = await Review.find({ worker: userId })
            .populate('reviewer', 'name profileImage')
            .sort({ createdAt: -1 })
            .limit(3);

        res.json({
            totalEarnings,
            activeLeads,
            responseRate: parseFloat(responseRate),
            rating,
            walletBalance,
            opportunities: opportunities.map(o => ({
                id: o._id,
                name: o.buyer?.name || 'Unknown',
                service: o.title || 'Service Request',
                location: o.buyer?.city || 'Unknown',
                distance: '2.5 km', // Placeholder
                price: o.price,
                time: o.createdAt
            })),
            leaderboard: leaderboard.map((w, idx) => ({
                id: w._id,
                rank: idx + 1,
                name: w.name,
                rating: w.rating,
                jobs: w.numReviews,
                avatar: w.profileImage
            })),
            recentReviews: recentReviews.map(r => ({
                id: r._id,
                reviewerName: r.reviewer?.name || 'Anonymous',
                rating: r.rating,
                comment: r.comment,
                date: r.createdAt
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (Admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user by ID (Admin)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.isApproved = req.body.isApproved !== undefined ? req.body.isApproved : user.isApproved;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                isApproved: updatedUser.isApproved
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve worker
// @route   PUT /api/users/workers/:id/approve
// @access  Private/Admin
const approveWorker = async (req, res) => {
    try {
        const worker = await User.findById(req.params.id);

        if (worker) {
            worker.isApproved = true;
            worker.kycStatus = 'approved';
            // Ensure correct role assignment
            if (worker.role !== 'worker') worker.role = 'worker';
            if (!worker.isProvider) worker.isProvider = true;

            await worker.save();

            // Create notification
            await Notification.create({
                user: worker._id,
                type: 'system',
                title: 'Account Approved',
                message: 'Your worker account has been approved! You can now start accepting orders.'
            });

            res.json({ message: 'Worker approved successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reject worker
// @route   PUT /api/users/workers/:id/reject
// @access  Private/Admin
const rejectWorker = async (req, res) => {
    try {
        const worker = await User.findById(req.params.id);

        if (worker) {
            worker.isApproved = false;
            worker.kycStatus = 'rejected';

            // Allow rejection even if role is inconsistent
            await worker.save();

            // Create notification
            await Notification.create({
                user: worker._id,
                type: 'system',
                title: 'Account Rejected',
                message: req.body.reason || 'Your worker account application has been rejected.'
            });

            res.json({ message: 'Worker rejected successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user addresses
// @route   GET /api/users/addresses
// @access  Private
const getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json(user.savedAddresses || []);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new address
// @route   POST /api/users/addresses
// @access  Private
const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const { type, name, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;

            const newAddress = {
                type,
                name,
                phone,
                addressLine1,
                addressLine2,
                city,
                state,
                pincode,
                isDefault
            };

            if (isDefault) {
                user.savedAddresses.forEach(addr => addr.isDefault = false);
            }

            user.savedAddresses.push(newAddress);
            await user.save();
            res.status(201).json(user.savedAddresses);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const address = user.savedAddresses.id(req.params.id);

            if (address) {
                address.type = req.body.type || address.type;
                address.name = req.body.name || address.name;
                address.phone = req.body.phone || address.phone;
                address.addressLine1 = req.body.addressLine1 || address.addressLine1;
                address.addressLine2 = req.body.addressLine2 || address.addressLine2;
                address.city = req.body.city || address.city;
                address.state = req.body.state || address.state;
                address.pincode = req.body.pincode || address.pincode;

                if (req.body.isDefault !== undefined) {
                    address.isDefault = req.body.isDefault;
                    if (address.isDefault) {
                        user.savedAddresses.forEach(addr => {
                            if (addr._id.toString() !== req.params.id) {
                                addr.isDefault = false;
                            }
                        });
                    }
                }

                await user.save();
                res.json(user.savedAddresses);
            } else {
                res.status(404);
                throw new Error('Address not found');
            }
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.savedAddresses = user.savedAddresses.filter(
                (addr) => addr._id.toString() !== req.params.id
            );
            await user.save();
            res.json(user.savedAddresses);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user wallet
// @route   GET /api/users/wallet
// @access  Private
const getWallet = async (req, res) => {
    try {
        let wallet = await Wallet.findOne({ user: req.user._id });

        if (!wallet) {
            // Create wallet if not exists
            wallet = await Wallet.create({ user: req.user._id, balance: 0 });
        }

        res.json({
            balance: wallet.balance,
            transactions: wallet.transactions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add money to wallet
// @route   POST /api/users/wallet/add
// @access  Private
const addMoneyToWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        const wallet = await Wallet.findOne({ user: req.user._id });

        if (wallet) {
            wallet.balance += amount;
            wallet.transactions.push({
                type: 'credit',
                amount: amount,
                description: 'Added money to wallet',
                status: 'completed'
            });

            await wallet.save();
            res.json({
                balance: wallet.balance,
                transactions: wallet.transactions
            });
        } else {
            res.status(404);
            throw new Error('Wallet not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get admin dashboard stats
// @route   GET /api/users/dashboard/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalWorkers = await User.countDocuments({ role: 'worker' });
        // Count accurately based on 'customer' role, including users who are NOT workers and NOT admins
        const totalCustomers = await User.countDocuments({ role: { $nin: ['worker', 'admin'] } });

        // Active bookings: pending, active, or in-progress
        // Ensure status strings match Order model exactly
        const activeBookings = await Order.countDocuments({
            status: { $regex: /pending|active|in-progress/i }
        });

        // Total Revenue (JS Calcs for safety)
        // Only count IsPaid: true orders
        const paidOrders = await Order.find({ isPaid: true }).select('price createdAt');
        const totalRevenue = paidOrders.reduce((acc, order) => acc + (order.price || 0), 0);

        // Monthly Revenue for current year
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = Array(12).fill(0);

        paidOrders.forEach(order => {
            const orderDate = new Date(order.createdAt);
            if (orderDate.getFullYear() === currentYear) {
                const month = orderDate.getMonth(); // 0-11
                if (month >= 0 && month < 12) {
                    monthlyRevenue[month] += (order.price || 0);
                }
            }
        });

        // Monthly Active Customers & Workers (users registered per month this year)
        const allUsers = await User.find({
            createdAt: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31`) }
        }).select('role createdAt');

        const monthlyActiveCustomers = Array(12).fill(0);
        const monthlyActiveWorkers = Array(12).fill(0);

        allUsers.forEach(u => {
            const month = new Date(u.createdAt).getMonth();
            if (u.role === 'worker') {
                monthlyActiveWorkers[month] += 1;
            } else if (u.role === 'customer') {
                monthlyActiveCustomers[month] += 1;
            }
        });

        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
        const recentOrders = await Order.find()
            .populate('buyer', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalUsers,
            totalWorkers,
            totalCustomers,
            activeBookings,
            totalRevenue,
            recentUsers,
            recentOrders,
            monthlyRevenue,
            monthlyActiveCustomers,
            monthlyActiveWorkers
        });
    } catch (error) {
        console.error("Error in getAdminStats:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get full platform activity history
// @route   GET /api/users/dashboard/history
// @access  Private/Admin
const getAdminActivityHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = req.query.filter || 'all'; // 'all', 'users', 'orders'

        let userEvents = [];
        let orderEvents = [];

        if (filter === 'all' || filter === 'users') {
            const users = await User.find()
                .select('name role createdAt profileImage city')
                .sort({ createdAt: -1 })
                .limit(limit * 2);
            userEvents = users.map(u => ({
                id: u._id,
                type: u.role === 'worker' ? 'worker_join' : 'customer_join',
                title: `${u.role === 'worker' ? 'New Worker' : 'New Customer'}: ${u.name}`,
                subtitle: u.city || 'Unknown city',
                time: u.createdAt,
                avatar: u.profileImage || null,
                role: u.role
            }));
        }

        if (filter === 'all' || filter === 'orders') {
            const orders = await Order.find()
                .populate('buyer', 'name profileImage')
                .populate('seller', 'name')
                .select('title status price createdAt buyer seller')
                .sort({ createdAt: -1 })
                .limit(limit * 2);
            orderEvents = orders.map(o => ({
                id: o._id,
                type: 'booking',
                title: `Booking: ${o.title}`,
                subtitle: `By ${o.buyer?.name || 'Unknown'} → ${o.seller?.name || 'Unknown'} | ₹${o.price}`,
                time: o.createdAt,
                avatar: o.buyer?.profileImage || null,
                status: o.status,
                price: o.price
            }));
        }

        const combined = [...userEvents, ...orderEvents]
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .slice(skip, skip + limit);

        const totalItems = userEvents.length + orderEvents.length;

        res.json({
            activities: combined,
            page,
            totalPages: Math.ceil(totalItems / limit),
            total: totalItems
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user favourites
// @route   GET /api/users/favourites
// @access  Private
const getFavourites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'favorites',
            populate: { path: 'user', select: 'name rating profileImage' } // Populate worker info inside the gig
        });

        if (user) {
            res.json(user.favorites || []);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle favorite gig
// @route   POST /api/users/favorites/:id
// @access  Private
const toggleFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const gigId = req.params.id;

        if (user) {
            if (user.favorites.includes(gigId)) {
                user.favorites = user.favorites.filter(id => id.toString() !== gigId);
                await user.save();
                res.json({ message: 'Removed from favorites', favorites: user.favorites });
            } else {
                user.favorites.push(gigId);
                await user.save();
                res.json({ message: 'Added to favorites', favorites: user.favorites });
            }
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle block user
// @route   PUT /api/users/:id/block
// @access  Private/Admin
const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.isBlocked = !user.isBlocked;
            await user.save();
            res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`, isBlocked: user.isBlocked });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerCategories = async (req, res) => {
    // Return all categories including those from landing page
    res.json(['Driver', 'Plumber', 'Electrician', 'House Help', 'Tutor', 'Fitness', 'Elder Care', 'IT Support', 'Cleaning', 'Electrical', 'Carpentry', 'Painting', 'Appliance Repair']);
};


// @desc    Forgot Password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash token and set to field
        user.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Set expire (10 minutes)
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        // Create reset URL (Point to Frontend, not backend)
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetUrl}`;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #0b3a69;">Password Reset Request</h2>
                <p>You requested a password reset. Please click the button below to reset your password. This link is valid for 10 minutes.</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0b3a69; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message,
                html
            });

            res.status(200).json({ success: true, message: 'Email sent' });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({ message: 'Email could not be sent' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password
// @route   PUT /api/users/reset-password/:resettoken
// @access  Public
const resetPassword = async (req, res) => {
    try {
        // Hash the token sent in the request
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getWorkers,
    getWorkerById,
    getWorkerDashboardStats,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    approveWorker,
    rejectWorker,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getWallet,
    addMoneyToWallet,
    getAdminStats,
    getAdminActivityHistory,
    toggleBlockUser,
    getFavourites,
    toggleFavorite,
    getWorkerCategories,
    forgotPassword,
    resetPassword
};
