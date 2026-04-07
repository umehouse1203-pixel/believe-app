import { X } from 'lucide-react';
import { useI18n } from '../i18n';
import { useLegalTranslations } from '../legalTranslations';

interface Props {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: Props) {
  const t = useI18n();
  const legalT = useLegalTranslations();
  
  const content = legalT[type];

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="legal-close-btn" onClick={onClose} aria-label={t.close}>
          <X size={24} />
        </button>
        
        <div className="legal-content-container">
          <h2>{content.title}</h2>
          <div className="legal-scroll-area">
            {content.body}
          </div>
        </div>
      </div>

      <style>{`
        .legal-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center; /* Center it back now that it has max-height */
          z-index: 10001; /* Modal above everything */
          animation: fadeIn 0.4s ease-out;
        }

        .legal-modal-content {
          background: rgba(25, 25, 25, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          width: 90%;
          max-width: 380px;
          height: auto;
          max-height: 75vh; /* Properly limit height */
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          color: var(--text-color);
          padding: 60px 25px 30px 25px;
          margin: auto;
        }

        .legal-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 10;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .legal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .legal-content-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .legal-content-container h2 {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          text-align: center;
          font-size: clamp(1.1rem, 4.5vmin, 1.3rem);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 15px;
          flex-shrink: 0;
        }

        .legal-scroll-area {
          flex: 1; /* Enables dynamic stretching inside the max-height box */
          font-size: clamp(0.75rem, 2.8vmin, 0.85rem);
          line-height: 1.9;
          font-weight: 300;
          letter-spacing: 0.06em;
          overflow-y: auto; /* Restores internal scrollbar */
          padding-right: 12px;
        }

        .legal-scroll-area::-webkit-scrollbar {
          width: 4px;
        }
        .legal-scroll-area::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .legal-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .legal-scroll-area h3 {
          font-size: 0.85rem;
          margin-top: 25px;
          margin-bottom: 8px;
          font-weight: 400;
          color: var(--text-color);
          opacity: 0.85;
          letter-spacing: 0.08em;
        }

        .legal-scroll-area p {
          margin-bottom: 15px;
          opacity: 0.65;
        }

        .light-theme .legal-modal-content {
          background: rgba(253, 250, 246, 0.85);
          border-color: rgba(0, 0, 0, 0.06);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }
        .light-theme .legal-content-container h2 {
          border-color: rgba(0, 0, 0, 0.06);
        }
        .light-theme .legal-scroll-area::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .light-theme .legal-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .light-theme .legal-close-btn {
          color: var(--text-color);
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.05);
        }
        .light-theme .legal-close-btn:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
