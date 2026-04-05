import { useState, useEffect, useRef } from 'react';
import { Target } from '../types';
import { useI18n } from '../i18n';

interface Props {
  target: Target;
  onEnd: (duration: number) => void;
}

export default function ThinkingView({ target, onEnd }: Props) {
  const [seconds, setSeconds] = useState(0);
  const t = useI18n();
  
  // Refを使って非アクティブ時の時間を無視する処理
  const activeTimeRef = useRef(0);
  const lastTickRef = useRef(Date.now());
  const isVisibleRef = useRef(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else {
        isVisibleRef.current = true;
        lastTickRef.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const timer = setInterval(() => {
      if (isVisibleRef.current) {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;
        activeTimeRef.current += delta;
        setSeconds(Math.floor(activeTimeRef.current / 1000));
      }
    }, 100);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="center-avatar" style={{ flexDirection: 'column', alignItems: 'center', gap: 'clamp(10px, 3dvh, 25px)' }}>
        <div className="target-avatar-container thinking-pulse">
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
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 1dvh, 8px)' }}>
           <p style={{ fontSize: 'clamp(0.65rem, 2vmin, 0.85rem)', opacity: 0.5, letterSpacing: '0.2em', fontWeight: 300, margin: 0 }}>{t.thinkingNow}</p>
           <p className="unified-time-text">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</p>
         </div>
      </div>

      <div className="fixed-action-container">
         <button className="unified-action-button" onClick={() => {
           // Calculate duration as accurately as possible at click time
           const finalDuration = Math.max(1, Math.floor(activeTimeRef.current / 1000));
           onEnd(finalDuration);
         }}>
           {t.endThink}
         </button>
      </div>
    </div>
  );
}
