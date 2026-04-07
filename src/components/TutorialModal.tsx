import { useI18n } from '../i18n';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function TutorialModal({ onClose }: Props) {
  const t = useI18n();
  
  const getTutorialImage = () => {
    const lang = navigator.language.split('-')[0].toLowerCase();
    const map: Record<string, string> = {
      ja: '2',
      en: '3',
      es: '4',
      zh: '5',
      ko: '6',
      fr: '7',
      de: '8',
      ar: '9',
      ru: '10',
      pt: '11',
    };
    const fileNum = map[lang] || '3';
    return `/tutorials/${fileNum}.svg`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content tutorial-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label={t.close}>
          <X size={24} />
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
          z-index: 10001;
          animation: fadeIn 0.4s ease-out;
        }
        
        .modal-content.tutorial-modal {
          background: #000;
          width: 90%;
          max-width: 380px;
          height: auto;
          max-height: 85vh;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: auto;
        }

        .modal-close-btn {
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

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .tutorial-image-container {
          width: 100%;
          overflow-y: auto;
          display: block;
        }

        .tutorial-image {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Light theme adaptations */
        .light-theme .modal-content.tutorial-modal {
          background: #000;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        .light-theme .modal-close-btn {
          color: var(--text-color);
          background: rgba(0, 0, 0, 0.05);
          border-color: rgba(0, 0, 0, 0.05);
        }
        .light-theme .modal-close-btn:hover {
          background: rgba(0, 0, 0, 0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
