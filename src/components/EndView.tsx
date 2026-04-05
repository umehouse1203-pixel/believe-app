import { useMemo } from 'react';
import { useI18n } from '../i18n';
import { EndStats } from '../types';

interface Props {
  duration: number;
  stats?: EndStats | null;
  onAcknowledge: () => void;
}

export default function EndView({ duration, stats, onAcknowledge }: Props) {
  const t = useI18n();
  
  // Determine Country Name for display
  // Determine Country Name for display
  const countryName = useMemo(() => {
    try {
      const regionCode = navigator.language.split('-')[1] || 'JP';
      const displayNames = new Intl.DisplayNames([navigator.language], { type: 'region' });
      return displayNames.of(regionCode) || 'ここ';
    } catch (e) {
      return 'ここ';
    }
  }, []);

  // Helper function to wrap numbers in spans
  const formatMsg = (template: string, placeholders: Record<string, any>) => {
    let parts: (string | JSX.Element)[] = [template];
    
    Object.entries(placeholders).forEach(([key, value]) => {
      const newParts: (string | JSX.Element)[] = [];
      const tag = `{${key}}`;
      
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        
        const segments = part.split(tag);
        segments.forEach((segment, i) => {
          newParts.push(segment);
          if (i < segments.length - 1) {
            if (key === 'hours' || key === 'count') {
              newParts.push(<span key={`${key}-${i}`} className="time-number">{value}</span>);
            } else {
              newParts.push(String(value));
            }
          }
        });
      });
      parts = newParts;
    });
    
    return parts;
  };

  const msgNode = useMemo(() => {
    const basicPool = [...t.messages].map(m => [m]);
    const statsPool: (string | JSX.Element)[][] = [];

    if (stats) {
      if (stats.globalHours > 0) {
        statsPool.push(formatMsg(t.stats.globalTotalTime, { hours: stats.globalHours }));
      }
      if (stats.localHours > 0) {
        statsPool.push(formatMsg(t.stats.localTotalTime, { country: countryName, hours: stats.localHours }));
      }
      if (stats.globalPeople > 0) {
        statsPool.push(formatMsg(t.stats.globalPeopleCount, { count: stats.globalPeople }));
      }
      if (stats.localPeople > 0) {
        statsPool.push(formatMsg(t.stats.localPeopleCount, { country: countryName, count: stats.localPeople }));
      }
    }
    
    const totalPool = [...basicPool, ...statsPool];
    return totalPool[Math.floor(Math.random() * totalPool.length)];
  }, [t, stats, countryName]);
  
  
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;

  return (
    <div className="app-container">
      <div className="logo-container">
        <h1 className="logo">believe</h1>
      </div>
      
      <div className="end-message-container">
        <h2 className="end-message-text">
          {msgNode}
        </h2>
      </div>
      
      <div className="fixed-time-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 1dvh, 8px)' }}>
          <p style={{ fontSize: 'clamp(0.65rem, 2vmin, 0.85rem)', opacity: 0.5, letterSpacing: '0.2em', fontWeight: 300, margin: 0 }}>{t.timeSpent}</p>
          <div className="unified-time-text">
            {mins > 0 && <><span className="time-number">{mins}</span>分</>}
            <span className="time-number">{secs}</span>秒
          </div>
        </div>
      </div>
      
      <div className="fixed-action-container">
        <button className="unified-action-button" onClick={onAcknowledge}>
          {t.back}
        </button>
      </div>
    </div>
  );
}
