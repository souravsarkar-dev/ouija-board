# 🕯️ Ouija Board

A mystical web app where users can ask questions and watch the planchette spell out answers letter by letter.

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React + Vite

## Learning Purpose

This project was built with the help of AI tools to learn full-stack development, backend-frontend integration, and deployment workflow.

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
```cmd
cd backend
```

2. Install dependencies:
```cmd
npm install
```

3. Start the server:
```cmd
npm start
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
```cmd
cd frontend
```

2. Install dependencies:
```cmd
npm install
```

3. Start the development server:
```cmd
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Make sure both backend and frontend are running
2. Open your browser to `http://localhost:3000`
3. Type your question in the input field
4. Click "Ask the spirits" or press Enter
5. Wait for the spooky response!

## API Endpoint

**POST** `/ask-spirit`

Request body:
```json
{
  "question": "Will I find success?"
}
```

Response:
```json
{
  "answer": "The spirits whisper... yes, but at a terrible cost... but heed this warning, mortal."
}
```

## Features

- Interactive Ouija board with letters, numbers, YES/NO
- Letter-by-letter animation as the "planchette" moves
- Glowing effect on active letters
- Mystical wooden board aesthetic
- Short, cryptic responses

## Note

This is a fictional entertainment app. No real spirits are consulted! 🕯️
