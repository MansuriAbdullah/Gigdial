# Worker Registration & Approval Flow

## Complete Workflow

### 1. Worker Registration
**Location:** `/register` page

When a worker signs up:
- They fill in their details (name, email, password, phone, city, address, skills)
- They upload KYC documents (Aadhaar Card, PAN Card, Profile Image)
- They check "Register as Service Provider"

**Backend Processing:**
- File: `controllers/userController.js` → `registerUser()`
- Automatically sets:
  - `role: 'worker'`
  - `isProvider: true`
  - `kycStatus: 'pending'` (if documents uploaded)
  - `isVerified: false`
  - `status: 'active'`

### 2. Admin Review
**Location:** `/admin/manage-workers` page

Admin can:
- View all workers with `kycStatus: 'pending'`
- Filter by: All, Pending, Verified, Rejected
- Click "View Docs" to see uploaded Aadhaar/PAN cards
- Click "Approve" or "Reject"

**Backend API:**
- GET `/api/admin/kyc/pending` - Fetch pending workers
- PUT `/api/admin/worker/:id/approve` - Approve worker
- PUT `/api/admin/worker/:id/reject` - Reject worker

**Approval Action:**
When admin clicks "Approve":
- `kycStatus` → `'approved'`
- `isVerified` → `true`
- `isProvider` → `true`
- `status` → `'active'`

### 3. Customer Browsing
**Location:** `/workers` page

Customers can:
- Browse only APPROVED workers
- Search by name or skills
- Filter by category (Plumbing, Electrical, Cleaning, etc.)
- View worker profiles with ratings and reviews
- Click to view full profile and book services

**Backend API:**
- GET `/api/admin/workers/approved`
- Returns only workers with:
  - `kycStatus: 'approved'`
  - `isVerified: true`
  - `isProvider: true`
  - `status: 'active'`

## Database States

### Worker Registration States:
```javascript
{
  role: 'worker',
  isProvider: true,
  kycStatus: 'pending',
  isVerified: false,
  status: 'active'
}
```

### After Admin Approval:
```javascript
{
  role: 'worker',
  isProvider: true,
  kycStatus: 'approved',
  isVerified: true,
  status: 'active'
}
```

### After Admin Rejection:
```javascript
{
  role: 'worker',
  isProvider: true,
  kycStatus: 'rejected',
  isVerified: false,
  rejectionReason: 'Documents did not meet requirements.'
}
```

## Key Files Modified

### Backend:
1. `controllers/userController.js` - Registration logic
2. `controllers/adminController.js` - Approval/rejection logic
3. `routes/adminRoutes.js` - Admin API routes
4. `models/User.js` - User schema with KYC fields

### Frontend:
1. `pages/Admin/ManageWorkers.jsx` - Admin approval interface
2. `pages/BrowseWorkers.jsx` - Customer browsing page
3. `App.jsx` - Route configuration

## Testing the Flow

1. **Register as Worker:**
   - Go to `/register`
   - Fill details and upload documents
   - Check "Register as Service Provider"
   - Submit

2. **Admin Approval:**
   - Login as Admin
   - Go to `/admin/manage-workers`
   - Click "Pending" filter
   - Find the new worker (e.g., "Sahil")
   - Click "View Docs" to verify documents
   - Click "Approve"

3. **Customer View:**
   - Go to `/workers` (no login required)
   - Search or filter workers
   - Only approved workers are visible
   - Click on worker card to view profile

## Security Notes

- Only admins can approve/reject workers
- Customer browsing is public (no auth required)
- KYC documents (Aadhaar/PAN) are NOT exposed in public API
- Only approved workers appear in customer search
