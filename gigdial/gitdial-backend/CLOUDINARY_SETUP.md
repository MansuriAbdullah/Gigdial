# Cloudinary Setup Instructions

This application uses Cloudinary for cloud-based file storage to handle image and document uploads.

## Why Cloudinary?

Cloudinary is used instead of local file storage because:
- ✅ Works on serverless/read-only file systems (AWS Lambda, Vercel, etc.)
- ✅ Automatic CDN delivery for fast image loading
- ✅ Free tier includes 25GB storage and 25GB bandwidth
- ✅ No need to manage local file storage

## Setup Steps

### 1. Create a Free Cloudinary Account
1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. Verify your email

### 2. Get Your Credentials
1. After logging in, go to your [Dashboard](https://cloudinary.com/console)
2. You'll see your account details:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Update Your Environment Variables

#### For Local Development:
Update your `.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

#### For Production (Live Server):
Add these environment variables to your hosting platform:
- On **Vercel**: Project Settings → Environment Variables
- On **Heroku**: Settings → Config Vars
- On **Railway**: Variables tab
- On **Render**: Environment → Environment Variables

### 4. Test the Upload

After setting up:
1. Restart your backend server
2. Try uploading a file (e.g., Aadhar card during signup)
3. The file will be uploaded to Cloudinary
4. The URL returned will be a Cloudinary CDN URL (e.g., `https://res.cloudinary.com/your-cloud-name/...`)

## File Upload Limits

Current configuration:
- **Max file size**: 5MB
- **Allowed formats**: JPG, JPEG, PNG, PDF
- **Storage folder**: `gigdial-uploads`

## Troubleshooting

### Error: "Invalid credentials"
- Double-check your Cloud Name, API Key, and API Secret
- Make sure there are no extra spaces in your `.env` file

### Error: "Upload failed"
- Check your Cloudinary account quota (free tier: 25GB)
- Verify the file format is allowed (jpg, jpeg, png, pdf)
- Ensure file size is under 5MB

### Files not showing in Cloudinary
- Log in to your Cloudinary dashboard
- Go to Media Library → `gigdial-uploads` folder
- All uploaded files will be there

## Free Tier Limits

Cloudinary free tier includes:
- ✅ 25 GB storage
- ✅ 25 GB monthly bandwidth
- ✅ 25,000 transformations/month
- ✅ Unlimited uploads

This is more than enough for most applications!
