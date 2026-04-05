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
  const countryName = useMemo(() => {
    try {
      const regionCode = navigator.language.split('-')[1] || 'JP';
      const displayNames = new Intl.DisplayNames([navigator.language], { type: 'region' });
      return displayNames.of(regionCode) || 'ここ';
    } catch (e) {
      return 'ここ';
    }
  }, []);

  // Combine basic messages and statistical messages with guards
  const msg = useMemo(() => {
    // Start with the basic 10 quiet messages
    const pool: string[] = [...t.messages];
    
    if (stats) {
      // Only include statistical messages if values are non-zero
      if (stats.globalHours > 0) {
        pool.push(t.stats.globalTotalTime.replace('{hours}', String(stats.globalHours)));
      }
      if (stats.localHours > 0) {
        pool.push(t.stats.localTotalTime.replace('{country}', countryName).replace('{hours}', String(stats.localHours)));
      }
      if (stats.globalPeople > 0) {
        pool.push(t.stats.globalPeopleCount.replace('{count}', String(stats.globalPeople)));
      }
      if (stats.localPeople > 0) {
        pool.push(t.stats.localPeopleCount.replace('{country}', countryName).replace('{count}', String(stats.localPeople)));
      }
    }
    
    return pool[Math.floor(Math.random() * pool.length)];
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
          {msg}
        </h2>
      </div>
      
      <div className="fixed-time-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 1dvh, 8px)' }}>
          <p style={{ fontSize: 'clamp(0.65rem, 2vmin, 0.85rem)', opacity: 0.5, letterSpacing: '0.2em', fontWeight: 300, margin: 0 }}>{t.timeSpent}</p>
          <p className="unified-time-text">{mins > 0 ? `${mins}${t.minutes} ` : ''}{secs}{t.seconds}</p>
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
