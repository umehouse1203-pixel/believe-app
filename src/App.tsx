import { useState, useEffect } from 'react';
import SetupView from './components/SetupView';
import HomeView from './components/HomeView';
import ThinkingView from './components/ThinkingView';
import EndView from './components/EndView';
import { Analytics } from './services/analytics';
import { Target, Session, EndStats } from './types';
import LandingView from './components/LandingView';
type ViewState = 'landing' | 'setup' | 'home' | 'thinking' | 'end';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [target, setTarget] = useState<Target | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isLight, setIsLight] = useState(false);
  const [stats, setStats] = useState<EndStats | null>(null);
  
  // Minimal Theme logic
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark'); 
    const saved = localStorage.getItem('believe_theme');
    if (saved === 'light') {
      setIsLight(true);
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('believe_theme', 'dark');
      setIsLight(false);
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('believe_theme', 'light');
      setIsLight(true);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (view === 'landing') return; // トップページではトーン切り替え不可
    const el = e.target as HTMLElement;
    if (
      el.closest('button') || 
      el.closest('input') || 
      el.closest('label') ||
      el.closest('.target-avatar-container') || 
      el.closest('.avatar-upload') ||
      el.closest('.reset-time-toggle')
    ) {
      return; // Do not toggle when interacting with core elements
    }
    toggleTheme();
  };

  useEffect(() => {
    if (view === 'landing') {
      document.body.classList.remove('light-theme');
    } else if (isLight) {
      document.body.classList.add('light-theme');
    }
  }, [view, isLight]);

  useEffect(() => {
    // Load from local storage
    const savedTarget = localStorage.getItem('believe_target');
    const savedSessions = localStorage.getItem('believe_sessions');
    if (savedTarget) {
      setTarget(JSON.parse(savedTarget));
      setView('home');
    }
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  const handleSaveTarget = (newTarget: Target, resetTime: boolean) => {
    try {
      localStorage.setItem('believe_target', JSON.stringify(newTarget));
    } catch (e) {
      console.warn("Saving target failed (likely storage full):", e);
    }
    setTarget(newTarget);
    
    if (resetTime) {
      setSessions([]);
      try {
        localStorage.removeItem('believe_sessions');
      } catch (e) {}
    }
    
    setView('home');
  };

  const handleEditTarget = () => {
    setView('setup');
  };

  const handleStartThinking = () => {
    setCurrentDuration(0);
    setView('thinking');
  };

  const handleEndThinking = async (duration: number) => {
    setCurrentDuration(duration);
    
    // Save session
    if (target && duration > 0) {
      const newSession: Session = {
        id: Date.now().toString(),
        targetName: target.name,
        durationSeconds: duration,
        date: new Date().toISOString()
      };
      const newSessions = [...sessions, newSession];
      setSessions(newSessions);
      localStorage.setItem('believe_sessions', JSON.stringify(newSessions));
      
      // Transmit telemetry and wait for it to ensure DB has the latest entry
      await Analytics.trackSession(target.name, duration);
      
      // Fetch latest global/local stats for the end view
      const freshStats = await Analytics.fetchStats(target.name);
      setStats(freshStats);
    }

    setView('end');
  };

  const handleAcknowledgeEnd = () => {
    setStats(null);
    setView('home');
  };

  const handleStartFromLanding = () => {
    const savedTarget = localStorage.getItem('believe_target');
    if (savedTarget) {
      setView('home');
    } else {
      setView('setup');
    }
  };

  return (
    <div className="global-bg-wrapper" onClick={handleBackgroundClick}>
      {view === 'landing' && <LandingView onStart={handleStartFromLanding} />}
      {view === 'setup' && <SetupView initialTarget={target || undefined} onSave={handleSaveTarget} />}
      {view === 'home' && target && <HomeView target={target} sessions={sessions} onStart={handleStartThinking} onEditTarget={handleEditTarget} />}
      {view === 'thinking' && target && <ThinkingView target={target} onEnd={handleEndThinking} />}
      {view === 'end' && <EndView duration={currentDuration} stats={stats} onAcknowledge={handleAcknowledgeEnd} />}
    </div>
  );
}

export default App;
