import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
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
                phone: user.phone,
                city: user.city,
                address: user.address,
                bio: user.bio,
                skills: user.skills,
                profileImage: user.profileImage,
                role: user.role,
                walletBalance: user.walletBalance,
                token: token // Include token in response
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, city, address, skills, isProvider } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let profileImage = '';
        let aadhaarCard = '';
        let panCard = '';

        if (req.files) {
            if (req.files.profileImage) {
                profileImage = req.files.profileImage[0].path;
            }
            if (req.files.aadhaarCard) {
                aadhaarCard = req.files.aadhaarCard[0].path;
            }
            if (req.files.panCard) {
                panCard = req.files.panCard[0].path;
            }
        }

        // Parse isProvider explicitly
        const isProviderBool = isProvider === 'true' || isProvider === true;

        let role = 'customer';
        if (isProviderBool) {
            role = 'worker';
        }

        let kycStatus = 'not_submitted';
        if ((aadhaarCard || panCard) && isProviderBool) {
            kycStatus = 'pending';
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            city,
            address,
            skills: skills ? JSON.parse(skills) : [],
            isProvider: isProviderBool,
            role,
            kycStatus,
            profileImage,
            aadhaarCard,
            panCard
        });

        if (user) {
            const token = generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isProvider: user.isProvider,
                profileImage: user.profileImage,
                phone: user.phone,
                city: user.city,
                address: user.address,
                bio: user.bio,
                skills: user.skills,
                role: user.role,
                walletBalance: user.walletBalance,
                token: token
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isProvider: user.isProvider,
                phone: user.phone,
                city: user.city,
                address: user.address,
                bio: user.bio,
                skills: user.skills,
                profileImage: user.profileImage,
                role: user.role,
                walletBalance: user.walletBalance
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.city = req.body.city || user.city;
            user.address = req.body.address || user.address;
            user.bio = req.body.bio || user.bio;
            user.skills = req.body.skills || user.skills;
            user.profileImage = req.body.profileImage || user.profileImage;


            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                isProvider: updatedUser.isProvider,
                phone: updatedUser.phone,
                city: updatedUser.city,
                address: updatedUser.address,
                bio: updatedUser.bio,
                skills: updatedUser.skills,
                profileImage: updatedUser.profileImage,
                role: updatedUser.role,
                walletBalance: updatedUser.walletBalance
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            res.json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
            user.isProvider = req.body.isProvider !== undefined ? req.body.isProvider : user.isProvider;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                isProvider: updatedUser.isProvider,
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
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
        const user = await User.findById(req.user._id).select('addresses');
        res.json(user.addresses || []);
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

        const { type, name, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;

        // If this is set as default, unset all other defaults
        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push({
            type,
            name,
            phone,
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            isDefault
        });

        await user.save();
        res.status(201).json(user.addresses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const address = user.addresses.find(addr => addr._id.toString() === req.params.id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        const { type, name, phone, addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;

        // If this is set as default, unset all other defaults
        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        address.type = type || address.type;
        address.name = name || address.name;
        address.phone = phone || address.phone;
        address.addressLine1 = addressLine1 || address.addressLine1;
        address.addressLine2 = addressLine2 !== undefined ? addressLine2 : address.addressLine2;
        address.city = city || address.city;
        address.state = state || address.state;
        address.pincode = pincode || address.pincode;
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

        await user.save();
        res.json(user.addresses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === req.params.id);

        if (addressIndex === -1) {
            return res.status(404).json({ message: 'Address not found' });
        }

        user.addresses.splice(addressIndex, 1);
        await user.save();
        res.json({ message: 'Address removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get wallet data
// @route   GET /api/users/wallet
// @access  Private
const getWallet = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('walletBalance walletTransactions');
        res.json({
            balance: user.walletBalance || 0,
            transactions: user.walletTransactions || []
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

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const user = await User.findById(req.user._id);

        // Add transaction
        user.walletTransactions.push({
            type: 'credit',
            amount,
            description: 'Money added to wallet',
            status: 'completed'
        });

        // Update balance
        user.walletBalance = (user.walletBalance || 0) + amount;

        await user.save();

        res.json({
            balance: user.walletBalance,
            transactions: user.walletTransactions
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get favourites
// @route   GET /api/users/favourites
// @access  Private
const getFavourites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('favourites', 'name email profileImage skills rating location experience completedJobs');
        res.json(user.favourites || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add to favourites
// @route   POST /api/users/favourites
// @access  Private
const addFavourite = async (req, res) => {
    try {
        const { workerId } = req.body;

        const user = await User.findById(req.user._id);
        const worker = await User.findById(workerId);

        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // Check if already in favourites
        if (user.favourites.includes(workerId)) {
            return res.status(400).json({ message: 'Already in favourites' });
        }

        user.favourites.push(workerId);
        await user.save();

        const updatedUser = await User.findById(req.user._id)
            .populate('favourites', 'name email profileImage skills rating location experience completedJobs');

        res.json(updatedUser.favourites);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Remove from favourites
// @route   DELETE /api/users/favourites/:workerId
// @access  Private
const removeFavourite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.favourites = user.favourites.filter(
            fav => fav.toString() !== req.params.workerId
        );

        await user.save();
        res.json({ message: 'Removed from favourites' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get referral data
// @route   GET /api/users/referral
// @access  Private
const getReferralData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('referrals.user', 'name email createdAt');

        res.json({
            referralCode: user.referralCode,
            referrals: user.referrals.map(ref => ({
                _id: ref.user?._id,
                name: ref.user?.name,
                status: ref.status,
                createdAt: ref.createdAt
            })),
            earnings: user.totalReferralEarnings || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all workers
// @route   GET /api/users/workers
// @access  Public
const getWorkers = async (req, res) => {
    try {
        const workers = await User.find({
            role: 'worker',
            kycStatus: 'approved'
        }).select('name email profileImage skills rating numReviews city bio experience completedJobs isVerified');

        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get worker categories (unique skills)
// @route   GET /api/users/worker-categories
// @access  Public
const getWorkerCategories = async (req, res) => {
    try {
        const workers = await User.find({
            role: 'worker',
            kycStatus: 'approved'
        }).select('skills');

        // Extract all unique skills
        const allSkills = workers.flatMap(worker => worker.skills || []);
        const uniqueSkills = [...new Set(allSkills)];

        res.json(uniqueSkills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get worker by ID (Public)
// @route   GET /api/users/workers/:id
// @access  Public
const getWorkerById = async (req, res) => {
    try {
        const worker = await User.findById(req.params.id)
            .select('name email profileImage skills rating numReviews city bio experience completedJobs isVerified phone portfolio role')
            .populate('portfolio');

        if (worker && worker.role === 'worker') {
            const reviews = await Review.find({ worker: req.params.id })
                .populate('reviewer', 'name profileImage')
                .sort({ createdAt: -1 });

            res.json({ ...worker.toObject(), reviews });
        } else {
            return res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get worker dashboard stats
// @route   GET /api/users/dashboard/stats
// @access  Private (Worker)
const getWorkerDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Get User Details
        const user = await User.findById(userId);

        // 2. Active Leads (Orders in pending/in_progress)
        const activeLeadsCount = await Order.countDocuments({
            seller: userId,
            status: { $in: ['pending', 'in_progress'] }
        });

        // 3. Pending Opportunities (New Leads to Accept/Decline)
        const pendingOpportunities = await Order.find({
            seller: userId,
            status: 'pending'
        })
            .populate('user', 'name profileImage address city')
            .populate('gig', 'title')
            .sort({ createdAt: -1 })
            .limit(5);

        // 4. Total Earnings (Sum of completed orders)
        const totalEarningsAgg = await Order.aggregate([
            {
                $match: {
                    seller: userId,
                    status: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);
        const totalEarnings = totalEarningsAgg.length > 0 ? totalEarningsAgg[0].total : 0;

        // 5. Response Rate (Calculated field, mock 98% if no data, or logic)
        // For simplicity:
        const responseRate = 98;

        // 6. Rating
        const rating = user.rating || 0;

        // 7. Leaderboard (Top 3 workers by rating)
        const leaderboard = await User.find({ role: 'worker' })
            .sort({ rating: -1, walletBalance: -1 })
            .limit(3)
            .select('name rating walletBalance');

        // 8. Recent Reviews
        const recentReviews = await Review.find({ worker: userId })
            .populate('reviewer', 'name profileImage')
            .sort({ createdAt: -1 })
            .limit(3);

        res.json({
            totalEarnings,
            activeLeads: activeLeadsCount,
            responseRate,
            rating,
            numReviews: user.numReviews || 0,
            walletBalance: user.walletBalance,
            opportunities: pendingOpportunities.map(order => ({
                id: order._id,
                name: order.user?.name || 'Unknown User',
                service: order.gig?.title || 'Service',
                location: order.user?.city || 'Unknown Location',
                distance: "N/A",
                price: `₹${order.totalAmount}`,
                time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: order.status
            })),
            leaderboard: leaderboard.map(w => ({
                id: w._id,
                name: w.name,
                rating: w.rating,
                earnings: w.walletBalance
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

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    // Address management
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    // Wallet management
    getWallet,
    addMoneyToWallet,
    // Favourites
    getFavourites,
    addFavourite,
    removeFavourite,
    // Referral
    getReferralData,
    // Workers
    getWorkers,
    getWorkerById,
    getWorkerCategories,
    getWorkerDashboardStats
};
