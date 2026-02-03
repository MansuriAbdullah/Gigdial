# Testing Worker Approval Flow

## Step-by-Step Testing Guide

### 1. Admin Login
1. Go to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `admin@gigdial.com`
   - Password: `admin123`
3. Click "Sign In"
4. You should be redirected to `/admin`

### 2. View Pending Workers
1. In Admin Panel, click "Manage Workers" in sidebar
2. Click "Pending" filter tab
3. You should see Sahil and any other pending workers
4. Each worker card shows:
   - Name, email, phone
   - KYC Status badge
   - Uploaded documents (Aadhaar, PAN)
   - Approve/Reject buttons

### 3. Approve Worker
1. Find Sahil's worker card
2. Click "View Docs" to verify documents
3. Click "Approve" button
4. You should see alert: "Worker approved successfully!"
5. The worker list will refresh
6. Sahil should now appear in "Verified" tab

### 4. Worker Gets Access
After approval, Sahil's account is updated:
- `kycStatus`: 'approved'
- `isVerified`: true
- `status`: 'active'

### 5. Verify Worker Can Login
1. Logout from admin
2. Login as Sahil:
   - Email: `sahil@gmail.com`
   - Password: (whatever was set during registration)
3. Should redirect to `/worker-dashboard`
4. Worker can now access all dashboard features:
   - Overview
   - Job Requests
   - My Services
   - Messages
   - My Bookings
   - Earnings
   - Profile
   - Settings

### 6. Customer Can See Worker
1. Go to `http://localhost:5173/workers` (no login needed)
2. Sahil should appear in the workers list
3. Customers can:
   - Search for Sahil
   - Filter by skills
   - View profile
   - Book services

## Expected Database State After Approval

```javascript
{
  _id: "...",
  name: "Sahil",
  email: "sahil@gmail.com",
  role: "worker",
  isProvider: true,
  kycStatus: "approved",  // Changed from 'pending'
  isVerified: true,       // Changed from false
  status: "active",       // Confirmed active
  aadhaarCard: "uploads/...",
  panCard: "uploads/...",
  profileImage: "uploads/..."
}
```

## Troubleshooting

### If Approve Button Fails:
1. Open browser console (F12)
2. Check for error messages
3. Look for:
   - "Sending request to: /api/admin/worker/{id}/approve"
   - Response data

### If Worker Not Visible to Customers:
1. Check database: `kycStatus` should be 'approved'
2. Check `/workers` page filters
3. Verify worker has `isVerified: true`

### If Worker Can't Login:
1. Verify password is correct
2. Check if account is active
3. Check browser console for errors

## API Endpoints Used

- **GET** `/api/users` - Fetch all users (admin only)
- **PUT** `/api/admin/worker/:id/approve` - Approve worker
- **PUT** `/api/admin/worker/:id/reject` - Reject worker
- **GET** `/api/admin/workers/approved` - Get approved workers (public)

## Success Criteria

✅ Admin can view pending workers
✅ Admin can approve workers
✅ Worker status updates in database
✅ Worker can login and access dashboard
✅ Approved workers visible on /workers page
✅ Customers can browse and book approved workers
