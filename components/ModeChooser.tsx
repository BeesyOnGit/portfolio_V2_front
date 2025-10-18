
import React from 'react';
import { useNavigation } from '../hooks/useNavigation';

const ModeChooser: React.FC = () => {
  const { navigateToMode } = useNavigation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg">
      <div className="text-center p-8 bg-white dark:bg-[#24283b] rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 dark:text-dark-cyan">Choose Your Experience</h1>
        <p className="text-gray-600 dark:text-dark-fg mb-6">
          Select how you'd like to view this portfolio. You can switch modes at any time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigateToMode('terminal')}
            className="flex-1 bg-gray-800 hover:bg-black dark:bg-dark-bg dark:hover:bg-black text-white font-mono py-3 px-6 rounded-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-dark-blue"
          >
            <span className="text-dark-green">$ </span>Terminal Mode
          </button>
          <button
            onClick={() => navigateToMode('classic')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Classic UI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeChooser;
   