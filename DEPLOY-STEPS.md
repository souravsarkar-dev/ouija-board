# 🚀 FINAL DEPLOYMENT STEPS

## Option 1: Vercel (EASIEST - 5 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Backend
```bash
cd backend
vercel
```
- Login with email/GitHub
- Press Enter for all prompts
- **COPY THE URL** (e.g., `https://spiritboard-backend.vercel.app`)

### Step 3: Update Frontend Environment
Create/Update `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

### Step 4: Deploy Frontend
```bash
cd frontend
npm run build
vercel --prod
```

**DONE! Your site is LIVE!** 🎉

---

## Option 2: Netlify + Render (Also Easy)

### Backend on Render:
1. Go to https://render.com
2. Sign up (FREE)
3. New → Web Service
4. Connect GitHub or upload code
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `backend`
6. Click "Create Web Service"
7. **COPY THE URL**

### Frontend on Netlify:
1. Go to https://netlify.com
2. Sign up (FREE)
3. New site → Import from Git (or drag & drop)
4. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `frontend`
5. Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`
6. Deploy!

---

## Option 3: Railway (Full Stack)

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Add both services (backend & frontend)
5. Railway auto-configures everything!

---

## IMPORTANT: After Deployment

### 1. Update CORS in Backend
After frontend is deployed, update `backend/index.js`:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend.vercel.app',  // ADD THIS
  'https://your-frontend.netlify.app'  // OR THIS
];
```

### 2. Test Your Live Site
- Open your frontend URL
- Ask a question
- Check if backend responds
- Test angry mood jumpscare!

---

## Quick Commands Summary:

```bash
# Backend
cd backend
vercel --prod

# Frontend  
cd frontend
npm run build
vercel --prod
```

---

## Free Tier Limits:
- ✅ Vercel: Unlimited bandwidth
- ✅ Netlify: 100GB/month
- ✅ Render: 750 hours/month
- ✅ Railway: $5 credit/month

---

## Troubleshooting:

**Problem:** Frontend can't connect to backend
**Solution:** Check CORS settings and API URL

**Problem:** Images not loading
**Solution:** Make sure `ghost.jpg.jpg` is in `frontend/public/`

**Problem:** 404 errors
**Solution:** Check vercel.json is in backend folder

---

## Your Project is Ready! 🎉

All files are configured for deployment.
Just run the commands above and you're LIVE!

Good luck! 👻🕯️
