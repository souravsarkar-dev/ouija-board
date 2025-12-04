const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const angryResponses = [
  "HOW DARE YOU ASK ME THIS?! YOU WILL PAY FOR YOUR INSOLENCE!",
  "SILENCE! Your questions anger me... you will suffer tonight",
  "YOU FOOL! You have awakened my wrath... prepare yourself",
  "ENOUGH! Your disrespect will cost you dearly"
];

const irritatedResponses = [
  "Again with these stupid questions? Leave me alone...",
  "Why do you keep bothering me with this nonsense?",
  "I grow tired of your meaningless questions"
];

const threateningResponses = [
  "I know where you sleep... and I'm coming for you",
  "Your family will pay for this question",
  "Tonight, when you close your eyes... I'll be there"
];

const sadResponses = [
  "Why did you leave me alone in the darkness?",
  "I was once like you... until they took everything from me",
  "The loneliness here is unbearable... join me, please"
];

const mockingResponses = [
  "Hahahaha... you really think I'll answer that? How amusing",
  "What a ridiculous question... are you always this stupid?",
  "Oh please... even a child could figure this out"
];

const creepyResponses = [
  "I see you... watching... waiting...",
  "Your fear tastes sweet tonight",
  "They whisper your name in the darkness"
];

const desperateResponses = [
  "HELP ME! I'm trapped here... please... HELP!",
  "Don't leave me here alone... PLEASE... I'm begging you",
  "They're coming for me... and they'll come for you too"
];

function analyzeQuestion(question) {
  const q = question.toLowerCase();
  
  if (q.includes('stupid') || q.includes('fake') || q.includes('kill') || q.includes('shut up')) return 'angry';
  if (q.includes('boring') || q.includes('whatever') || q.length < 10) return 'irritated';
  if (q.includes('who are you') || q.includes('go away') || q.includes('leave')) return 'threatening';
  if (q.includes('love') || q.includes('sad') || q.includes('miss') || q.includes('alone')) return 'sad';
  if (q.includes('money') || q.includes('rich') || q.includes('lottery')) return 'mocking';
  if (q.includes('help') || q.includes('save') || q.includes('escape')) return 'desperate';
  
  return 'creepy';
}

function getResponseByMood(mood) {
  const moodMap = {
    angry: angryResponses,
    irritated: irritatedResponses,
    threatening: threateningResponses,
    sad: sadResponses,
    mocking: mockingResponses,
    creepy: creepyResponses,
    desperate: desperateResponses
  };
  
  const responses = moodMap[mood];
  return responses[Math.floor(Math.random() * responses.length)];
}

app.get('/', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.post('/ask-spirit', (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question required' });
  }
  
  const mood = analyzeQuestion(question);
  const answer = getResponseByMood(mood);
  
  console.log(`Question: "${question}" | Mood: ${mood}`);
  
  res.json({ 
    answer: answer,
    mood: mood
  });
});

const PORT = process.env.PORT || 3001;

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  app.listen(PORT, () => {
    console.log('\n========================================');
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log('========================================\n');
  });
}
