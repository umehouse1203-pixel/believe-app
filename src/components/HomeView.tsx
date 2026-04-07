import { Target, Session } from '../types';
import { useI18n } from '../i18n';

interface Props {
  target: Target;
  sessions: Session[];
  onStart: () => void;
  onEditTarget: () => void;
  onLogoClick?: () => void;
}

export default function HomeView({ target, sessions, onStart, onEditTarget, onLogoClick }: Props) {
  const t = useI18n();
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
        <><span className="time-number">{s}</span>{t.seconds}</>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="logo-container" onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : 'default' }}>
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
      </div>
    </div>
  );
}
