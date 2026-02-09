# GigDial Database Schema Design (MongoDB/Mongoose)

This document outlines the complete database schema architecture for the GigDial platform. It is designed to support a multi-role marketplace (Customer, Worker, Admin) with high scalability and real-time features.

## 1. Overview and Architecture
- **Database**: MongoDB (NoSQL)
- **ODM**: Mongoose
- **Relationships**: handled via `ObjectId` references (normalized) and embedding where appropriate for performance.
- **Timestamps**: All collections include `createdAt` and `updatedAt`.

---

## 2. Collections (Tables)

### 1. Users Collection
Stores authentication, profile, and role-based data.
```javascript
const UserSchema = new mongoose.Schema({
  // Auth
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // Hashed
  role: { type: String, enum: ['admin', 'worker', 'customer'], default: 'customer' }, // Combined role logic
  
  // Profile
  phone: { type: String },
  city: { type: String },
  address: { type: String },
  profileImage: { type: String },
  bio: { type: String },
  
  // Worker Specific
  isProvider: { type: Boolean, default: false }, // Legacy flag, use role if possible but keep for backward compat
  skills: [{ type: String }],
  portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' }],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  
  // Verification (Worker)
  aadhaarCard: { type: String },
  panCard: { type: String },
  isVerified: { type: Boolean, default: false },
  
  // Wallet & Loyalty
  walletBalance: { type: Number, default: 0 },
  loyaltyPoints: { type: Number, default: 0 },
  
  // System
  isAdmin: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'banned', 'suspended'], default: 'active' },
  lastLogin: { type: Date },
}, { timestamps: true });
```

### 2. Gigs (Services) Collection
Service listings created by workers.
```javascript
const GigSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // The Worker
  
  // Details
  title: { type: String, required: true, index: 'text' },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  subCategory: { type: String },
  tags: [{ type: String }],
  
  // Pricing & Delivery
  price: { type: Number, required: true },
  deliveryTime: { type: Number, required: true }, // In days
  revisions: { type: Number, default: 1 },
  
  // Media
  coverImage: { type: String },
  gallery: [{ type: String }],
  
  // Stats
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },
  
  // Status
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Admin approval
}, { timestamps: true });
```

### 3. Orders (Bookings) Collection
Tracks service transactions from creation to completion.
```javascript
const OrderSchema = new mongoose.Schema({
  // Relationships
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  
  // Financials
  amount: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['wallet', 'card', 'upi'], required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  
  // Workflow Status
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'submitted', 'completed', 'cancelled', 'disputed'], 
    default: 'pending' 
  },
  
  // Deliverables
  requirements: { type: String }, // Customer requirements
  deliveryFile: { type: String }, // Worker submission
  deliveredAt: { type: Date },
  
  // Timestamps
  completedAt: { type: Date },
}, { timestamps: true });
```

### 4. Reviews Collection
Feedback left by customers for workers/gigs.
```javascript
const ReviewSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Customer
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Worker being reviewed
  
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  reply: { type: String }, // Worker's reply
}, { timestamps: true });
```

### 5. Messages (Chat) Collection
Real-time communication.
```javascript
const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, index: true }, // Unique ID combining both user IDs (smaller_larger) for direct lookup
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  content: { type: String, required: true },
  attachments: [{ type: String }], // File URLs
  
  isRead: { type: Boolean, default: false },
  readAt: { type: Date },
}, { timestamps: true });
```

### 6. Notifications Collection
System alerts for users.
```javascript
const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { 
    type: String, 
    enum: ['order_status', 'message', 'payment', 'system', 'promotion'], 
    required: true 
  },
  title: { type: String },
  message: { type: String, required: true },
  link: { type: String }, // URL to redirect
  isRead: { type: Boolean, default: false },
}, { timestamps: true });
```

### 7. Transactions (Wallet) Collection
Ledger for all financial movements.
```javascript
const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  
  // Context
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // If related to order
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'success' },
  referenceId: { type: String }, // External Gateway ID
}, { timestamps: true });
```

### 8. Portfolios Collection
Showcase items for workers.
```javascript
const PortfolioSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String, required: true }],
  link: { type: String },
  
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Admin moderation
}, { timestamps: true });
```

### 9. Disputes Collection
Conflict resolution tickets.
```javascript
const DisputeSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  initiator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  reason: { type: String, required: true },
  description: { type: String, required: true },
  evidence: [{ type: String }],
  
  status: { type: String, enum: ['open', 'resolved', 'closed'], default: 'open' },
  resolution: { type: String }, // Admin notes
  refundAmount: { type: Number },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin
}, { timestamps: true });
```

### 10. Favorites (Wishlist) Collection
```javascript
const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Can store either Gig OR Worker
  gig: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
```

---

## 3. Indexes & Optimization
1.  **Search**: `User` collection indexed on `name` and `skills`. `Gig` collection indexed on `title`, `description`, `category`.
2.  **Performance**:
    - `Orders`: Indexed by `customer` and `worker` for fast dashboard loading.
    - `Messages`: Indexed by `conversationId` and `createdAt` for sorting.

## 4. Role-Based Access Control (RBAC) Implied
- **Admin**: Full CRUD on all collections.
- **Worker**: CRUD on own `Gigs`, `Portfolio`, `Orders` (update status).
- **Customer**: Create `Orders`, `Reviews`, `Disputes`.

