import { useState } from 'react';
import { useI18n } from '../i18n';
import TutorialModal from './TutorialModal';
import LegalModal from './LegalModal';

interface Props {
  onStart: () => void;
}

export default function LandingView({ onStart }: Props) {
  const t = useI18n();
  const [showTutorial, setShowTutorial] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="landing-app-container">
      {/* Background Image corresponding to 1.svg */}
      <div 
        className="landing-bg-layer" 
        style={{ backgroundImage: 'url("/tutorials/background.png")' }}
      ></div>
      
      <div className="landing-content-layer">
        
        {/* Logo area positioned identically to other views */}
        <div className="logo-container" style={{ position: 'absolute', top: 0, left: 0 }}>
          <h1 className="logo">believe</h1>
        </div>

        {/* Top Spacer */}
        <div style={{ flex: 1 }}></div>

        {/* Description area */}
        <div className="end-message-container" style={{ margin: '30px 0', gridRow: 'auto' }}>
          <p className="end-message-text" style={{ fontSize: 'clamp(0.95rem, 3.5vmin, 1.2rem)', whiteSpace: 'pre-wrap' }}>
            {t.lpConceptDescription}
          </p>
        </div>

        {/* Action area */}
        <div className="fixed-action-container" style={{ gridRow: 'auto', marginTop: '20px' }}>
          <button className="unified-action-button" onClick={onStart}>
            {t.lpStart}
          </button>
          
          <button 
            className="unified-action-button" 
            style={{ marginTop: 'clamp(25px, 6dvh, 50px)' }}
            onClick={() => setShowTutorial(true)}
          >
            {t.howToUse}
          </button>
        </div>
        
        {/* Bottom Spacer */}
        <div style={{ flex: 1 }}></div>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); setLegalType('privacy'); }}>{t.privacyPolicy}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setLegalType('terms'); }}>{t.termsOfUse}</a>
            <a href="mailto:umedinosaur@gmail.com">{t.contactUs}</a>
          </div>
        </footer>
      </div>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      {legalType && <LegalModal type={legalType} onClose={() => setLegalType(null)} />}

      <style dangerouslySetInnerHTML={{ __html: `
        .landing-app-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background-color: var(--bg-color);
        }

        .landing-bg-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center bottom;
          /* Night mode default */
          background-color: rgba(0, 0, 0, 0.4);
          background-blend-mode: overlay;
          z-index: 1;
          transition: background-color 1.5s ease, filter 1.5s ease;
        }

        .light-theme .landing-bg-layer {
          /* Day mode */
          background-color: rgba(253, 250, 246, 0.8);
          background-blend-mode: screen;
          filter: saturate(0.8) sepia(0.1);
        }

        .landing-content-layer {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          overflow-y: auto;
        }

        .landing-title-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .landing-footer {
          width: 100%;
          text-align: center;
          padding-bottom: 15px;
          font-size: 0.85rem;
          color: var(--text-color);
          opacity: 0.5;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          letter-spacing: 0.05em;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .footer-links a {
          color: inherit;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        
        .footer-links a:hover {
          opacity: 1;
        }
      `}} />
    </div>
  );
}
