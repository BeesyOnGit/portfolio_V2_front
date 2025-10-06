import React from 'react';
import { useAppContext } from './hooks/useAppContext';
import ModeChooser from './components/ModeChooser';
import Terminal from './components/Terminal';
import ClassicLayout from './components/ClassicLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

const App: React.FC = () => {
  const { mode, isDashboardVisible, isAuthenticated } = useAppContext();

  const renderPortfolio = () => {
    if (mode === null) {
      return <ModeChooser />;
    }
    if (mode === 'terminal') {
      return <Terminal />;
    }
    return <ClassicLayout />;
  };

  const renderContent = () => {
    if (isDashboardVisible) {
      return isAuthenticated ? <Dashboard /> : <Login />;
    }
    return renderPortfolio();
  }

  return (
    <div className="bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-fg min-h-screen font-sans transition-colors duration-300">
      {renderContent()}
    </div>
  );
};

export default App;
