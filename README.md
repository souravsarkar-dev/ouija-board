# 🕯️ Ouija Board - Interactive Spirit Communication Experience

A spine-chilling, interactive Ouija board web application that brings the supernatural to your browser. Communicate with spirits, but beware - anger them and face the consequences!

## 🎃 Live Demo

**[Try it now!](https://ouija-board-project-l9auhacjj-souravsarkardev1-5310s-projects.vercel.app)**

## ✨ Features

### 🔮 Spirit Communication
- **Random Spirit Summoning**: Each session connects you with a different spirit (MALACHI, LILITH, AZRAEL, etc.)
- **AI-Powered Responses**: Spirits respond based on your questions with varying moods
- **Letter-by-Letter Animation**: Watch as the planchette moves across the board to spell out messages

### 🕯️ 3-Candle Protection System
- Three mystical candles protect your session
- Anger the spirit and watch candles extinguish one by one
- All candles out? The spirit forcefully ends the session!

### 👻 Multiple Spirit Moods
- **Angry** 😡 - Insult the spirit and face its wrath (candles go out!)
- **Threatening** 😈 - Challenge the spirit at your own risk
- **Sad** 😢 - Touch the spirit's emotional side
- **Mocking** 😏 - Ask silly questions, get mocked
- **Desperate** 😱 - The spirit needs help
- **Creepy** 👁️ - Default unsettling responses
- **Irritated** 😒 - Boring questions annoy the spirit

### 🎬 Scary Visual Effects
- **Jumpscare Ghost**: Appears when spirits are extremely angry
- **Screen Shake**: Intense vibrations during supernatural events
- **Fog & Mist**: Atmospheric background effects
- **Blood Effects**: Dripping blood and spreading darkness
- **Glitch Effects**: Reality-bending visual distortions
- **Lightning Flashes**: Random environmental changes
- **Ghostly Footprints**: Watch spirits walk across your screen

### 🎮 Session Management
- **Start New Session**: Summon a random spirit
- **End Session**: Safely dismiss the spirit with dramatic exit animation
- **Session Termination**: Automatic end when all candles are extinguished

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **CSS3** - Advanced animations and effects

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Vercel** - Serverless deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/souravsarkar-dev/ouija-board.git
cd ouija-board
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running Locally

1. **Start Backend Server**
```bash
cd backend
node index.js
```
Backend will run on `http://localhost:3001`

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

3. **Open your browser** and visit `http://localhost:3000`

## 🎯 How to Use

1. **Start a Session**: Click "🔮 Start New Session" to summon a spirit
2. **Ask Questions**: Type your question and click "Ask the Board"
3. **Watch the Magic**: See the planchette move and spell out the spirit's response
4. **Mind the Candles**: Keep track of the three candles - don't anger the spirit!
5. **End Session**: Click "⚠️ End Session" when you're done (or wait for the spirit to leave)

## 😈 How to Anger the Spirit

Want to see the candle system in action? Try these questions:
- "you are stupid"
- "i will kill you"
- "you are fake"
- "shut up idiot"
- "this is a joke"

Each angry response extinguishes one candle. Three strikes and you're out!

## 📁 Project Structure

```
ouija-board/
├── backend/
│   ├── api/
│   │   └── index.js          # Main API logic
│   ├── index.js              # Server entry point
│   ├── package.json
│   └── vercel.json           # Vercel deployment config
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Styling and animations
│   │   ├── main.jsx          # React entry point
│   │   └── assets/           # Images and sounds
│   ├── public/
│   │   ├── ghost.jpg.jpg     # Jumpscare image
│   │   └── whisper.mp3       # Ambient sound
│   ├── package.json
│   └── vite.config.js
├── LICENSE                    # MIT License
└── README.md                  # This file
```

## 🎨 Key Features Breakdown

### Mood Detection System
The backend analyzes your questions using keyword detection:
- 30+ trigger words for angry responses
- Context-aware mood selection
- 70% analyzed mood, 30% random for unpredictability

### Candle System Logic
```javascript
- Start: 3 candles lit
- Angry response: -1 candle
- 0 candles: Automatic session end
```

### Animation System
- CSS keyframe animations for smooth effects
- JavaScript-triggered visual changes
- Synchronized audio-visual experiences

## 🌐 Deployment

### Vercel Deployment

**Backend:**
```bash
cd backend
vercel --prod
```

**Frontend:**
```bash
cd frontend
vercel --prod
```

Update `frontend/.env.production` with your backend URL.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sourav Sarkar**
- GitHub: [@souravsarkar-dev](https://github.com/souravsarkar-dev)

## ⚠️ Disclaimer

This is a fictional entertainment application. No real spirits are involved. Use at your own risk for entertainment purposes only!

## 🙏 Acknowledgments

- Inspired by classic Ouija board experiences
- Built for hackathon submission
- Special thanks to the open-source community

---

**Made with 💀 and ☕ by Sourav Sarkar,Sourasis Karak,Asis Sarkar**

*"The spirits are waiting... will you dare to ask?"*
