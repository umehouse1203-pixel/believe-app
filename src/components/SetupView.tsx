import { useState, useRef } from 'react';
import { Target } from '../types';
import { useI18n } from '../i18n';

interface Props {
  initialTarget?: Target;
  onSave: (target: Target, resetTime: boolean) => void;
  onLogoClick?: () => void;
}

export default function SetupView({ initialTarget, onSave, onLogoClick }: Props) {
  const [name, setName] = useState(initialTarget?.name || '');
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialTarget?.photoUrl || null);
  const [resetTime, setResetTime] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useI18n();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), photoUrl }, resetTime);
  };

  return (
    <div className="app-container">
      <div className="logo-container" onClick={onLogoClick} style={{ cursor: onLogoClick ? 'pointer' : 'default' }}>
        <h1 className="logo">believe</h1>
      </div>
      
      <form id="setup-form" className="setup-form" onSubmit={handleSubmit}>
        <div className="avatar-upload" onClick={() => fileInputRef.current?.click()}>
          {photoUrl ? (
            <img src={photoUrl} alt="Preview" className="avatar-preview" />
          ) : (
            <div className="avatar-placeholder">
               <span>{t.photoUpload}</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
        </div>

        <input 
          type="text" 
          className="minimal-input"
          placeholder={t.placeholderName} 
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          required
          maxLength={30}
        />

        {initialTarget && (
          <label className="reset-time-toggle">
            <input 
              type="checkbox" 
              checked={resetTime} 
              onChange={e => setResetTime(e.target.checked)} 
            />
            <span className="reset-time-text">{t.resetTimeOption}</span>
          </label>
        )}
        
        <div className="fixed-action-container">
          <button type="submit" className="unified-action-button" disabled={!name.trim()}>
            {initialTarget ? t.updateSetup : t.startSetup}
          </button>
        </div>
      </form>
    </div>
  );
}
