import { useState } from 'react';
import { Target, Session } from '../types';
import { useI18n } from '../i18n';
import TutorialModal from './TutorialModal';

interface Props {
  target: Target;
  sessions: Session[];
  onStart: () => void;
  onEditTarget: () => void;
}

export default function HomeView({ target, sessions, onStart, onEditTarget }: Props) {
  const t = useI18n();
  const [showTutorial, setShowTutorial] = useState(false);
  const totalSeconds = sessions
    .filter(s => s.targetName === target.name)
    .reduce((acc, s) => acc + s.durationSeconds, 0);
  
  const formatTime = (totalSec: number) => {
    const s = totalSec % 60;
    const m = Math.floor(totalSec / 60) % 60;
    const h = Math.floor(totalSec / 3600);
    
    return (
      <div className="unified-time-text">
        {h > 0 && <><span className="time-number">{h}</span>{t.hours}</>}
        {m > 0 && <><span className="time-number">{m}</span>{t.minutes}</>}
        {h === 0 && m === 0 && <><span className="time-number">{s}</span>{t.seconds}</>}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="logo-container">
        <h1 className="logo">believe</h1>
      </div>
      
      <div className="center-avatar" style={{ flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 3dvh, 25px)' }}>
        <div className="target-avatar-container editable-avatar" onClick={onEditTarget} title="Edit Profile">
          <div className="target-avatar">
            {target.photoUrl ? (
               <img src={target.photoUrl} alt={target.name} />
            ) : (
               <div className="avatar-text">{target.name.charAt(0)}</div>
            )}
          </div>
        </div>
        <div style={{ fontSize: 'clamp(0.9rem, 3vmin, 1.2rem)', fontWeight: 300, letterSpacing: '0.2em', opacity: 0.85 }}>
          {target.name}
        </div>
      </div>
      
      <div className="fixed-time-container">
        {totalSeconds > 0 ? (
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 1dvh, 8px)' }}>
             <p style={{ fontSize: 'clamp(0.65rem, 2vmin, 0.85rem)', opacity: 0.5, letterSpacing: '0.2em', fontWeight: 300, margin: 0 }}>{t.totalTime}</p>
             {formatTime(totalSeconds)}
           </div>
        ) : (
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 1dvh, 8px)' }}>
             <p style={{ fontSize: 'clamp(0.65rem, 2vmin, 0.85rem)', opacity: 0, letterSpacing: '0.2em', fontWeight: 300, margin: 0 }} aria-hidden="true">Spacer</p>
             <div className="unified-time-text">{t.startingNow}</div>
           </div>
        )}
      </div>

      <div className="fixed-action-container">
        <button className="unified-action-button" onClick={onStart}>{t.startThink}</button>
        <button 
          className="how-to-use-btn" 
          onClick={() => setShowTutorial(true)}
          style={{
            marginTop: '20px',
            fontSize: '0.8rem',
            opacity: 0.4,
            fontWeight: 300,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            padding: '10px 20px',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
        >
          {t.howToUse}
        </button>
      </div>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </div>
  );
}
