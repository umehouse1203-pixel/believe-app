import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check saved preference or fallback to system preference if we wanted to
    const saved = localStorage.getItem('believe_theme');
    if (saved === 'light') {
      setIsLight(true);
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggle = () => {
    if (isLight) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('believe_theme', 'dark');
      setIsLight(false);
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('believe_theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <div className="theme-toggle-wrapper">
      <label className="theme-switch" aria-label="Toggle minimal theme">
        <input 
          type="checkbox" 
          checked={!isLight} 
          onChange={toggle} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
