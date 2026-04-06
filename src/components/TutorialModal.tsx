import { useI18n } from '../i18n';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function TutorialModal({ onClose }: Props) {
  const t = useI18n();
  
  // Choose which tutorial image to show based on browser language
  // Fallback to English if the specific translation image is not yet generated
  const getTutorialImage = () => {
    const lang = navigator.language.split('-')[0];
    const supported = ['ja', 'en', 'es', 'zh'];
    if (supported.includes(lang)) {
      return `/tutorials/${lang}.png`;
    }
    return '/tutorials/en.png';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content tutorial-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label={t.close}>
          <X size={24} />
          <span className="close-text">{t.close}</span>
        </button>
        
        <div className="tutorial-image-container">
          <img src={getTutorialImage()} alt={t.howToUse} className="tutorial-image" />
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          animation: fadeIn 0.4s ease-out;
        }
        
        .modal-content.tutorial-modal {
          background: #111;
          width: 90%;
          max-width: 400px;
          height: auto;
          max-height: 85vh;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .modal-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 10;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-family: inherit;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .close-text {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          font-weight: 300;
        }

        .tutorial-image-container {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .tutorial-image-container::-webkit-scrollbar { display: none; }

        .tutorial-image {
          width: 100%;
          height: auto;
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
