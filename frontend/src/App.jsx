import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('');

  const letters = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
    ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  useEffect(() => {
    if (!answer || loading || answer === '') return;

    let index = 0;
    setDisplayedAnswer('');
    setCurrentLetter('');

    const interval = setInterval(() => {
      if (index < answer.length) {
        const char = answer[index].toUpperCase();
        setCurrentLetter(char);
        setDisplayedAnswer(answer.substring(0, index + 1));
        index++;
      } else {
        setCurrentLetter('');
        clearInterval(interval);
      }
    }, 150);

    return () => {
      clearInterval(interval);
      setCurrentLetter('');
    };
  }, [answer, loading]);

  const showScaryGhost = () => {
    // Extreme jumpscare effect with REAL ghost image
    const ghost = document.createElement('div');
    ghost.className = 'scary-ghost-jumpscare';
    
    ghost.innerHTML = `
      <div class="jumpscare-content">
        <img src="/ghost.jpg.jpg" class="ghost-image" alt="ghost" />
        <div class="static-noise"></div>
      </div>
    `;
    
    document.body.appendChild(ghost);
    
    // Extreme screen shake
    document.body.style.animation = 'extremeShake 0.1s 20';
    
    // Play scream sound
    try {
      const scream = new Audio('https://www.myinstants.com/media/sounds/movie_1.mp3');
      scream.volume = 0.7;
      scream.play().catch(() => {});
    } catch (e) {
      console.log('Scream sound failed');
    }
    
    setTimeout(() => {
      ghost.remove();
      document.body.style.animation = '';
    }, 2000);
  };

  const askSpirit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    setDisplayedAnswer('');
    setCurrentLetter('');

    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);

    try {
      const audio = new Audio('/whisper.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      console.log('Audio play failed');
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/ask-spirit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Backend responded with error');
      }

      const data = await response.json();
      
      if (data.answer) {
        setAnswer(data.answer);
        
        // Show mood indicator
        if (data.mood) {
          setCurrentMood(data.mood);
          setShowMood(true);
          setTimeout(() => setShowMood(false), 4000);
        }
        
        // Candle system - blow out candle if spirit is angry
        if (data.mood === 'angry' && candles > 0) {
          const newCandles = candles - 1;
          setCandles(newCandles);
          setShowCandleWarning(true);
          setTimeout(() => setShowCandleWarning(false), 3000);
          
          if (newCandles === 0) {
            // All candles out - spirit leaves!
            setTimeout(() => {
              endSession();
            }, 2000);
          }
        }
        
        if (data.mood === 'angry') {
          showScaryGhost();
          document.body.style.animation = 'shake 0.3s 5';
          document.body.style.filter = 'hue-rotate(20deg) brightness(1.2)';
          setTimeout(() => { document.body.style.filter = ''; }, 3000);
        } else if (data.mood === 'threatening') {
          document.body.style.filter = 'brightness(0.5) contrast(1.5)';
          setTimeout(() => { document.body.style.filter = ''; }, 4000);
        } else if (data.mood === 'sad') {
          document.body.style.filter = 'grayscale(0.8) blur(1px)';
          setTimeout(() => { document.body.style.filter = ''; }, 5000);
        } else if (data.mood === 'desperate') {
          document.body.style.animation = 'shake 0.2s 10';
          document.body.style.filter = 'invert(0.1) brightness(1.3)';
          setTimeout(() => { document.body.style.filter = ''; }, 3000);
        }
      } else {
        setAnswer('CANNOT SAY');
      }
    } catch (error) {
      console.error('Error:', error);
      setAnswer('SPIRITS ARE SILENT');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      askSpirit();
    }
  };

  const getMoodDisplay = (mood) => {
    const moodData = {
      angry: { text: 'SPIRIT IS ENRAGED', color: '#ff0000', icon: '😡' },
      irritated: { text: 'SPIRIT IS ANNOYED', color: '#ff6600', icon: '😒' },
      threatening: { text: 'SPIRIT IS THREATENING', color: '#8b0000', icon: '😈' },
      sad: { text: 'SPIRIT IS MOURNING', color: '#4169e1', icon: '😢' },
      mocking: { text: 'SPIRIT IS MOCKING YOU', color: '#9400d3', icon: '😏' },
      desperate: { text: 'SPIRIT IS DESPERATE', color: '#ff1493', icon: '😱' },
      creepy: { text: 'SPIRIT IS WATCHING', color: '#2f4f4f', icon: '👁️' }
    };
    return moodData[mood] || moodData.creepy;
  };

  const [currentMood, setCurrentMood] = useState('');
  const [showMood, setShowMood] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [spiritName, setSpiritName] = useState('');
  const [showEndSession, setShowEndSession] = useState(false);
  const [candles, setCandles] = useState(3);
  const [showCandleWarning, setShowCandleWarning] = useState(false);

  const spiritNames = [
    'MALACHI', 'LILITH', 'AZRAEL', 'MORGANA', 'DAMIEN', 
    'RAVEN', 'SALEM', 'LUCIFER', 'BELIAL', 'AZAZEL'
  ];

  const startNewSession = () => {
    const randomSpirit = spiritNames[Math.floor(Math.random() * spiritNames.length)];
    setSpiritName(randomSpirit);
    setSessionActive(true);
    setShowEndSession(false);
    setAnswer('');
    setDisplayedAnswer('');
    setCandles(3);
    setShowCandleWarning(false);
    
    // Scary entrance animation
    document.body.style.animation = 'shake 0.5s 3';
    document.body.style.filter = 'brightness(0.3)';
    
    setTimeout(() => {
      document.body.style.filter = '';
      document.body.style.animation = '';
    }, 1500);
  };

  const endSession = () => {
    setShowEndSession(true);
    
    // Scary exit animation
    document.body.style.animation = 'shake 0.3s 5';
    document.body.style.filter = 'hue-rotate(180deg) brightness(0.5)';
    
    try {
      const scream = new Audio('https://www.myinstants.com/media/sounds/movie_1.mp3');
      scream.volume = 0.5;
      scream.play().catch(() => {});
    } catch (e) {}
    
    setTimeout(() => {
      document.body.style.filter = '';
      document.body.style.animation = '';
      setSessionActive(false);
      setAnswer('');
      setDisplayedAnswer('');
      setSpiritName('');
      setShowEndSession(false);
    }, 2000);
  };

  return (
    <div className="app">
      <div className="fog"></div>
      <div className="fog fog2"></div>
      
      {showEndSession && (
        <div className="session-end-overlay">
          <div className="session-end-content">
            <h2 className="glitch" data-text="SESSION TERMINATED">SESSION TERMINATED</h2>
            <p className="spirit-leaving">{spiritName} IS LEAVING...</p>
          </div>
        </div>
      )}
      
      {showMood && currentMood && (
        <div className="mood-indicator" style={{ '--mood-color': getMoodDisplay(currentMood).color }}>
          <div className="mood-content">
            <span className="mood-icon">{getMoodDisplay(currentMood).icon}</span>
            <span className="mood-text">{getMoodDisplay(currentMood).text}</span>
          </div>
        </div>
      )}
      
      <div className="container">
        <h1>🕯️ OUIJA BOARD 🕯️</h1>
        
        {sessionActive && (
          <div className="candles-container">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`candle ${num <= candles ? 'lit' : 'out'}`}>
                <div className="flame"></div>
                <div className="wick"></div>
                <div className="wax"></div>
              </div>
            ))}
          </div>
        )}
        
        {showCandleWarning && (
          <div className="candle-warning">
            <p className="warning-text">⚠️ A CANDLE HAS BEEN EXTINGUISHED! ⚠️</p>
            <p className="warning-subtext">The spirit grows angrier... {candles} candle{candles !== 1 ? 's' : ''} remaining</p>
          </div>
        )}
        
        {sessionActive && spiritName && (
          <div className="spirit-info">
            <p className="spirit-name">Connected to: <span className="spirit-name-text">{spiritName}</span></p>
          </div>
        )}
        <p className="subtitle">
          {sessionActive 
            ? "The spirit awaits your question..." 
            : "Click 'Start Session' to summon a spirit"}
        </p>
        
        <div className="ouija-board">
          <div className="letters-row">
            {letters[0].map(letter => (
              <div 
                key={letter} 
                className={`letter ${currentLetter === letter ? 'active' : ''}`}
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="letters-row">
            {letters[1].map(letter => (
              <div 
                key={letter} 
                className={`letter ${currentLetter === letter ? 'active' : ''}`}
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="numbers-row">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(num => (
              <div 
                key={num} 
                className={`number ${currentLetter === num ? 'active' : ''}`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="yes-no-row">
            <div className={`yes-no ${currentLetter === 'Y' && answer.startsWith('YES') ? 'active' : ''}`}>YES</div>
            <div className={`yes-no ${currentLetter === 'N' && answer.startsWith('NO') ? 'active' : ''}`}>NO</div>
          </div>
          <div className="goodbye-row">
            <div className="goodbye">GOODBYE</div>
          </div>
        </div>

        <div className="input-section">
          {!sessionActive ? (
            <button onClick={startNewSession} className="session-button start-session">
              🔮 Start New Session
            </button>
          ) : (
            <>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your question..."
                disabled={loading}
              />
              <button onClick={askSpirit} disabled={loading || !question.trim()}>
                {loading ? 'Contacting spirits...' : 'Ask the Board'}
              </button>
              <button onClick={endSession} className="session-button end-session" disabled={loading}>
                ⚠️ End Session
              </button>
            </>
          )}
        </div>

        {displayedAnswer && (
          <div className="answer-section">
            <h3>Message from beyond:</h3>
            <p className="answer">{displayedAnswer}</p>
          </div>
        )}

        <p className="disclaimer">⚠️ For entertainment purposes only. Not a real Ouija board.</p>
      </div>
    </div>
  );
}

export default App;
