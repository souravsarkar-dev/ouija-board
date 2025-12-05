---
inclusion: always
---

# Ouija Board Project Guidelines

## Project Overview
This is an interactive Ouija board web application built with React and Node.js. The project creates a spooky, immersive experience where users can communicate with virtual spirits.

## Development Standards

### Code Style
- Use ES6+ JavaScript features
- Follow React best practices and hooks patterns
- Keep components modular and reusable
- Use meaningful variable and function names
- Add comments for complex logic

### Animation Guidelines
- All animations should enhance the spooky atmosphere
- Use CSS keyframes for smooth transitions
- Keep animations performant (avoid layout thrashing)
- Test animations on different devices

### Spirit Response System
- Mood detection should feel natural and AI-like
- Responses should vary to avoid repetition
- Angry responses trigger candle system
- Balance between predictable and random behavior

### Candle System Rules
- Start with 3 lit candles per session
- Only angry mood extinguishes candles
- Automatic session end when all candles are out
- Visual feedback for each candle state change

## File Structure
- `/frontend` - React application
- `/backend` - Express.js API
- Keep frontend and backend separate
- Use environment variables for configuration

## Testing Checklist
- [ ] Session start/end works correctly
- [ ] Candle system triggers on angry responses
- [ ] All animations play smoothly
- [ ] Responsive design on mobile
- [ ] Backend API responds correctly
- [ ] No console errors

## Deployment
- Backend deployed on Vercel serverless
- Frontend deployed on Vercel
- Environment variables properly configured
- CORS enabled for API access
