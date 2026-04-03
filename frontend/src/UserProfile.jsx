import { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile({ onBack }) {
  const [username, setUsername] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [stats, setStats] = useState({
    totalSessions: 0,
    spiritsContacted: [],
    questionsAsked: 0,
    angryEncounters: 0,
    favoriteSpirit: null,
  });
  const [sessionHistory, setSessionHistory] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem('ouija_username') || 'Anonymous Seeker';
    setUsername(savedName);

    const savedStats = localStorage.getItem('ouija_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const savedHistory = localStorage.getItem('ouija_session_history');
    if (savedHistory) {
      setSessionHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveUsername = () => {
    const name = tempName.trim() || 'Anonymous Seeker';
    setUsername(name);
    localStorage.setItem('ouija_username', name);
    setEditingName(false);
  };

  const startEditing = () => {
    setTempName(username);
    setEditingName(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveUsername();
    if (e.key === 'Escape') setEditingName(false);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all session history?')) {
      localStorage.removeItem('ouija_stats');
      localStorage.removeItem('ouija_session_history');
      setStats({
        totalSessions: 0,
        spiritsContacted: [],
        questionsAsked: 0,
        angryEncounters: 0,
        favoriteSpirit: null,
      });
      setSessionHistory([]);
    }
  };

  const getFavoriteSpirit = () => {
    if (!stats.spiritsContacted || stats.spiritsContacted.length === 0) return 'None yet';
    const freq = {};
    stats.spiritsContacted.forEach((s) => {
      freq[s] = (freq[s] || 0) + 1;
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  };

  const getDangerLevel = () => {
    const angry = stats.angryEncounters || 0;
    if (angry === 0) return { label: 'Safe', color: '#4caf50', icon: '🕊️' };
    if (angry < 3) return { label: 'Curious', color: '#ff9800', icon: '👁️' };
    if (angry < 7) return { label: 'Reckless', color: '#f44336', icon: '💀' };
    return { label: 'Damned', color: '#9c27b0', icon: '😈' };
  };

  const danger = getDangerLevel();

  return (
    <div className="profile-overlay">
      <div className="profile-container">
        <button className="profile-back-btn" onClick={onBack}>
          ← Back to Board
        </button>

        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">🔮</span>
          </div>
          <div className="profile-name-section">
            {editingName ? (
              <div className="name-edit-row">
                <input
                  className="name-input"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  maxLength={30}
                  placeholder="Enter your name..."
                />
                <button className="name-save-btn" onClick={saveUsername}>✓</button>
                <button className="name-cancel-btn" onClick={() => setEditingName(false)}>✗</button>
              </div>
            ) : (
              <div className="name-display-row">
                <h2 className="profile-username">{username}</h2>
                <button className="name-edit-btn" onClick={startEditing} title="Edit name">✎</button>
              </div>
            )}
            <span className="profile-role">Spirit Communicator</span>
          </div>
        </div>

        <div className="danger-badge" style={{ '--danger-color': danger.color }}>
          <span className="danger-icon">{danger.icon}</span>
          <div className="danger-info">
            <span className="danger-label">Risk Level</span>
            <span className="danger-value">{danger.label}</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.totalSessions || 0}</span>
            <span className="stat-label">Sessions</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.questionsAsked || 0}</span>
            <span className="stat-label">Questions Asked</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.angryEncounters || 0}</span>
            <span className="stat-label">Angry Spirits</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{getFavoriteSpirit()}</span>
            <span className="stat-label">Most Contacted</span>
          </div>
        </div>

        <div className="history-section">
          <div className="history-header">
            <h3 className="history-title">📜 Session History</h3>
            {sessionHistory.length > 0 && (
              <button className="clear-history-btn" onClick={clearHistory}>Clear All</button>
            )}
          </div>
          {sessionHistory.length === 0 ? (
            <p className="no-history">No sessions recorded yet. Start a session to begin your journey...</p>
          ) : (
            <ul className="history-list">
              {[...sessionHistory].reverse().slice(0, 10).map((session, i) => (
                <li key={i} className="history-item">
                  <div className="history-item-main">
                    <span className="history-spirit">{session.spiritName}</span>
                    <span className="history-questions">{session.questions} question{session.questions !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="history-item-sub">
                    <span className="history-date">{new Date(session.date).toLocaleDateString()}</span>
                    {session.angryCount > 0 && (
                      <span className="history-angry">😡 ×{session.angryCount}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="profile-footer">⚠️ Statistics are stored locally on this device.</p>
      </div>
    </div>
  );
}

export default UserProfile;
