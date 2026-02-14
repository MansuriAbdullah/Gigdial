# 🚀 Quick Setup Guide - Fix Production Upload Error

## Problem Fixed
❌ **Error**: `EROFS: read-only file system, open '/var/task/gigdial/gitdial-backend/uploads/aadhaarCard-*.png'`

✅ **Solution**: Replaced local file storage with **Cloudinary** cloud storage

---

## 📋 Setup Steps (IMPORTANT - DO THIS NOW!)

### Step 1: Create Cloudinary Account (2 minutes)
1. Go to: https://cloudinary.com/users/register/free
2. Sign up with your email
3. Verify your email

### Step 2: Get Your Credentials
1. Login to Cloudinary Dashboard: https://cloudinary.com/console
2. Copy these 3 values:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### Step 3: Update Local .env File
Open `gigdial-backend/.env` and replace these values:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here    # Replace with your Cloud Name
CLOUDINARY_API_KEY=your_api_key_here          # Replace with your API Key
CLOUDINARY_API_SECRET=your_api_secret_here    # Replace with your API Secret
```

### Step 4: Update Production Environment Variables
Add these 3 environment variables to your live server:

**If using Vercel:**
1. Go to your project → Settings → Environment Variables
2. Add:
   - `CLOUDINARY_CLOUD_NAME` = your cloud name
   - `CLOUDINARY_API_KEY` = your api key
   - `CLOUDINARY_API_SECRET` = your api secret

**If using Heroku:**
1. Settings → Config Vars → Add:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

**If using Railway/Render:**
1. Variables tab → Add the 3 variables

### Step 5: Deploy to Production
```bash
git pull origin main
```
Then redeploy your application.

---

## ✅ What Changed?

### Before (Local Storage - Doesn't work in production):
```javascript
// Saved to local disk
uploads/aadhaarCard-123456.png  ❌ Read-only filesystem error
```

### After (Cloudinary - Works everywhere):
```javascript
// Saved to cloud
https://res.cloudinary.com/your-cloud/image/upload/v123/gigdial-uploads/aadhaarCard-123456.png  ✅
```

---

## 🧪 Test It

1. Update your `.env` with Cloudinary credentials
2. Restart backend: `npm run dev`
3. Try signing up with Aadhar card upload
4. Should work! ✅

---

## 📊 Free Tier Limits (More than enough!)
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ Unlimited uploads

---

## 🆘 Need Help?

Read the detailed guide: `CLOUDINARY_SETUP.md`

Or check Cloudinary docs: https://cloudinary.com/documentation
