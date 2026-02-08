# 🚀 Deployment Guide - Subscription Tracker

## Prerequisites
- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## 🔥 Deploy to Firebase Hosting

### 1. Login to Firebase
```bash
firebase login
```

### 2. Initialize Firebase (if not done)
```bash
firebase init hosting
```
- Select "Use an existing project"
- Choose your Firebase project: `subscription-tracker-a6c30`
- Set public directory as: `dist`
- Configure as single-page app: `Yes`
- Don't overwrite index.html: `No`

### 3. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 4. Deploy to Hosting
```bash
firebase deploy --only hosting
```

Or deploy everything at once:
```bash
firebase deploy
```

## 🌐 Your Live URL
After deployment, your app will be available at:
```
https://subscription-tracker-a6c30.web.app
```
or
```
https://subscription-tracker-a6c30.firebaseapp.com
```

## 🔧 Environment Setup

### Firebase Configuration
All Firebase credentials are already configured in `src/firebase.ts`:
- API Key: `AIzaSyByGhcAHo9FEmCiE7MZA_Uwi9faGbYHz34`
- Auth Domain: `subscription-tracker-a6c30.firebaseapp.com`
- Project ID: `subscription-tracker-a6c30`

### Security Notes
✅ **Firestore Security Rules** are configured to:
- Allow only authenticated users to access their own data
- Each user can only read/write to `/subscriptions/{their-uid}`

## 🔄 Continuous Deployment

For automatic deployments on every push:

```bash
# Install GitHub Actions or use Firebase CLI
firebase deploy --only hosting
```

## 📱 Features Included
✅ Google Authentication
✅ Firestore Database
✅ Offline Support (Cache API)
✅ Responsive Design
✅ PWA Ready
✅ SEO Optimized

## 🛠️ Post-Deployment Checklist
- [ ] Test Google Sign-in
- [ ] Test creating subscriptions
- [ ] Test data persistence
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify Firestore rules are active
- [ ] Test offline functionality

## 📞 Support
For issues or questions, check the [Firebase Console](https://console.firebase.google.com/project/subscription-tracker-a6c30)
