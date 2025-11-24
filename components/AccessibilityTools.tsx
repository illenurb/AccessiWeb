import React, { useContext } from 'react';
import { ThemeContext } from '../App';

export const AccessibilityTools: React.FC = () => {
  const { toggleHighContrast, increaseFontSize, decreaseFontSize, resetSettings, highContrast } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <button
        onClick={increaseFontSize}
        className="w-12 h-12 bg-white text-primary border-2 border-primary rounded-full shadow-lg flex items-center justify-center text-xl font-bold hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-secondary transition-colors"
        aria-label="Increase text size"
        title="Increase text size"
      >
        A+
      </button>
      <button
        onClick={decreaseFontSize}
        className="w-12 h-12 bg-white text-primary border-2 border-primary rounded-full shadow-lg flex items-center justify-center text-lg font-bold hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-secondary transition-colors"
        aria-label="Decrease text size"
        title="Decrease text size"
      >
        A-
      </button>
      <button
        onClick={toggleHighContrast}
        className={`w-12 h-12 border-2 border-primary rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-secondary transition-colors ${highContrast ? 'bg-primary text-white' : 'bg-white text-primary'}`}
        aria-label="Toggle high contrast"
        title="Toggle high contrast"
      >
        ◑
      </button>
      <button
        onClick={resetSettings}
        className="w-12 h-12 bg-white text-primary border-2 border-primary rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-secondary transition-colors"
        aria-label="Reset accessibility settings"
        title="Reset settings"
      >
        ↺
      </button>
    </div>
  );
};
