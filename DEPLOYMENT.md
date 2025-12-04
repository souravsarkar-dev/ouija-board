# 🚀 Ouija Board Deployment Guide

## Option 1: Vercel (Recommended - FREE)

### Backend Deployment:

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy Backend:**
```bash
cd backend
vercel
```
- Login with GitHub/Email
- Follow prompts
- Note the deployed URL (e.g., `https://your-backend.vercel.app`)

### Frontend Deployment:

1. **Update API URL in frontend:**
   - Open `frontend/src/App.jsx`
   - Replace `http://localhost:3001` with your backend URL
   - Example: `https://your-backend.vercel.app`

2. **Deploy Frontend:**
```bash
cd frontend
npm run build
vercel
```
- Follow prompts
- Your site will be live!

---

## Option 2: Netlify (Frontend) + Render (Backend)

### Backend on Render:

1. Go to https://render.com
2. Sign up (FREE)
3. Click "New +" → "Web Service"
4. Connect GitHub repo or upload code
5. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
6. Deploy!
7. Copy the URL (e.g., `https://your-app.onrender.com`)

### Frontend on Netlify:

1. Go to https://netlify.com
2. Sign up (FREE)
3. Drag & drop `frontend/dist` folder
4. Or connect GitHub repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **IMPORTANT:** Update API URL in code before building
7. Deploy!

---

## Option 3: Railway (Full Stack - FREE)

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Deploy backend:
   - Add service → GitHub repo → select backend folder
   - Railway auto-detects Node.js
5. Deploy frontend:
   - Add service → GitHub repo → select frontend folder
   - Add environment variable: `VITE_API_URL=<backend-url>`
6. Done!

---

## Quick Deploy Commands:

### Backend (Vercel):
```bash
cd backend
vercel --prod
```

### Frontend (Vercel):
```bash
cd frontend
npm run build
vercel --prod
```

---

## Important Notes:

1. **Update CORS in backend** after deployment:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000']
}));
```

2. **Update API URL in frontend** (`App.jsx`):
```javascript
const response = await fetch('https://your-backend.vercel.app/ask-spirit', {
```

3. **Environment Variables:**
   - Backend: No sensitive data currently
   - Frontend: Update API URL

---

## Free Hosting Limits:

- **Vercel:** Unlimited bandwidth, 100GB/month
- **Netlify:** 100GB bandwidth/month
- **Render:** 750 hours/month (always on)
- **Railway:** $5 free credit/month

---

## Recommended Setup:

✅ **Backend:** Vercel or Render  
✅ **Frontend:** Vercel or Netlify  

Both are FREE and easy to use!

---

## Need Help?

1. Make sure both servers work locally first
2. Test API endpoints before deploying
3. Update URLs after deployment
4. Check browser console for errors

Good luck! 🚀👻
