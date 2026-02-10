import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Wallet from '../models/Wallet.js';
import Notification from '../models/Notification.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user/set token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
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
        const { name, email, password, phone, city, address, skills, role } = req.body;

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
            skills: role === 'worker' ? skills : undefined,
            role: role || 'customer',
            isProvider: role === 'worker',
            profileImage: req.files?.profileImage?.[0]?.path,
            aadhaarCard: req.files?.aadhaarCard?.[0]?.path,
            panCard: req.files?.panCard?.[0]?.path
        });

        if (user) {
            // Create wallet for user
            await Wallet.create({ user: user._id, balance: 0 });

            const token = generateToken(res, user._id);

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
        user.city = req.body.city || user.city;
        user.address = req.body.address || user.address;
        user.bio = req.body.bio || user.bio;
        user.skills = req.body.skills || user.skills;

        if (req.file) {
            user.profileImage = req.file.path;
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
            role: 'worker',
            isApproved: true
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
            status: 'pending'
        });

        // 3. Response Rate (simplified - percentage of accepted vs total orders)
        const totalOrders = await Order.countDocuments({ seller: userId });
        const acceptedOrders = await Order.countDocuments({
            seller: userId,
            status: { $in: ['in-progress', 'completed'] }
        });
        const responseRate = totalOrders > 0 ? ((acceptedOrders / totalOrders) * 100).toFixed(1) : 0;

        // 4. Rating
        const user = await User.findById(userId);
        const rating = user.rating || 0;

        // 5. Recent Orders/Opportunities
        const opportunities = await Order.find({ seller: userId })
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
        const totalCustomers = await User.countDocuments({ role: 'customer' });

        const orders = await Order.find();
        const activeBookings = orders.filter(o => !o.isDelivered).length;
        const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
        const recentOrders = await Order.find().populate('user', 'name').sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            totalWorkers,
            totalCustomers,
            activeBookings,
            totalRevenue,
            recentUsers,
            recentOrders
        });
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
    getAdminStats
};
