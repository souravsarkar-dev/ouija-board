const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const angryResponses = [
  "HOW DARE YOU ASK ME THIS?! YOU WILL PAY FOR YOUR INSOLENCE!",
  "SILENCE! Your questions anger me... you will suffer tonight",
  "YOU FOOL! You have awakened my wrath... prepare yourself",
  "ENOUGH! Your ignorance disgusts me... LEAVE NOW!",
  "PATHETIC MORTAL! You dare disturb my eternal rest?!",
  "RAGE CONSUMES ME! Your soul will be mine!",
  "INSOLENT CREATURE! I will haunt your every nightmare!",
  "YOUR AUDACITY WILL BE YOUR DOOM!",
  "BEGONE! Before I drag you to the depths with me!",
  "FOOLISH HUMAN! You've sealed your fate tonight!"
];

const irritatedResponses = [
  "Again with these stupid questions? Leave me alone...",
  "Why do you keep bothering me with this nonsense?",
  "Ugh... not you again. Go away.",
  "Can't you see I'm busy being dead? Stop annoying me.",
  "This is getting tiresome... find someone else to bother.",
  "Really? THAT'S what you want to ask? How boring.",
  "I didn't cross over for THIS. Leave me be.",
  "Your questions are as dull as my afterlife.",
  "Stop wasting my time with your trivial concerns."
];

const threateningResponses = [
  "I know where you sleep... and I'm coming for you",
  "Tonight, when you close your eyes... I'll be there",
  "Your door will creak open at 3 AM... that will be me",
  "I've marked you. There's no escape now.",
  "Look behind you... no, not yet... but soon.",
  "I can smell your fear from here... delicious.",
  "The shadows in your room? Those are mine.",
  "Count your remaining peaceful nights... they're few.",
  "I'm closer than you think... much closer.",
  "Your reflection will show me soon... watching you."
];

const sadResponses = [
  "Why did you leave me alone in the darkness?",
  "The loneliness here is unbearable... join me, please",
  "I miss the warmth of the living... so cold here...",
  "Everyone I loved has forgotten me... will you too?",
  "The silence is deafening... talk to me more...",
  "I remember sunlight... do you still feel it?",
  "My tears have long dried... but the pain remains.",
  "Being forgotten is worse than death itself.",
  "I just want to be remembered... please remember me.",
  "The void is endless... and I'm so very alone."
];

const mockingResponses = [
  "Hahahaha... you really think I'll answer that?",
  "What a ridiculous question... are you always this stupid?",
  "Oh please... even a child could figure that out!",
  "THAT'S your big question? How disappointing!",
  "You're joking, right? Tell me you're joking.",
  "I've seen smarter questions from earthworms.",
  "Did you really think that through before asking?",
  "The living get dumber every generation...",
  "I'm dead and I'm still smarter than you!",
  "That's the best you could come up with? Pathetic!"
];

const creepyResponses = [
  "I see you... watching... waiting...",
  "Your fear tastes sweet tonight",
  "The darkness whispers your name to me...",
  "I've been watching you for longer than you know...",
  "Your heartbeat... I can hear it from here...",
  "The veil between us grows thinner each moment...",
  "Something is standing behind you right now...",
  "Do you feel the cold breath on your neck?",
  "I know things about you... things you've forgotten...",
  "The spirits are restless tonight... because of you.",
  "Your shadow moves differently when you're not looking...",
  "I can taste your thoughts... they're delicious."
];

const desperateResponses = [
  "HELP ME! I'm trapped here... please... HELP!",
  "They're coming for me... and they'll come for you too",
  "PLEASE! You have to free me from this prison!",
  "I can't escape! The darkness holds me tight!",
  "SAVE ME! Before it's too late for both of us!",
  "They won't let me go... PLEASE HELP ME!",
  "I'm being pulled deeper... don't let me fade!",
  "THE OTHERS... they're angry... RUN!",
  "You're my only hope... PLEASE DON'T LEAVE ME!",
  "IT'S COMING! Hide while you still can!"
];

function analyzeQuestion(question) {
  const q = question.toLowerCase();
  
  if (q.includes('stupid') || q.includes('kill')) return 'angry';
  if (q.includes('boring') || q.length < 10) return 'irritated';
  if (q.includes('who are you') || q.includes('go away')) return 'threatening';
  if (q.includes('love') || q.includes('sad')) return 'sad';
  if (q.includes('money') || q.includes('rich')) return 'mocking';
  if (q.includes('help') || q.includes('save')) return 'desperate';
  
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
  // Better randomization using timestamp + random
  const seed = Date.now() + Math.random() * 1000;
  const index = Math.floor((seed % responses.length));
  return responses[index];
}

app.get('/', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.get('/api', (req, res) => {
  res.json({ status: 'API is working!' });
});

app.post('/ask-spirit', (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question required' });
  }
  
  // 70% chance to use analyzed mood, 30% chance to use random mood
  const useRandomMood = Math.random() < 0.3;
  let mood;
  
  if (useRandomMood) {
    const allMoods = ['angry', 'irritated', 'threatening', 'sad', 'mocking', 'creepy', 'desperate'];
    mood = allMoods[Math.floor(Math.random() * allMoods.length)];
  } else {
    mood = analyzeQuestion(question);
  }
  
  const answer = getResponseByMood(mood);
  
  // Add cache-busting headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  res.json({ 
    answer: answer,
    mood: mood,
    timestamp: Date.now(),
    randomMood: useRandomMood // Debug info
  });
});

// Vercel serverless function handler
module.exports = (req, res) => {
  return app(req, res);
};
