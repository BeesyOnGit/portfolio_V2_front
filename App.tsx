import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './hooks/useAppContext';
import ModeChooser from './components/ModeChooser';
import TerminalWrapper from './components/TerminalWrapper';
import ClassicLayout from './components/ClassicLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

const App: React.FC = () => {
  const { mode, isAuthenticated } = useAppContext();

  return (
    <div className="bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-fg min-h-screen font-sans transition-colors duration-300">
      <Routes>
        {/* Admin routes */}
        <Route path="/admin" element={isAuthenticated ? <Dashboard /> : <Login />} />
        
        {/* Terminal mode routes */}
        <Route path="/terminal/*" element={<TerminalWrapper />} />
        
        {/* Classic mode routes */}
        <Route path="/classic/*" element={<ClassicLayout />} />
        
        {/* Root route */}
        <Route path="/" element={
          mode === null ? <ModeChooser /> : 
          mode === 'terminal' ? <Navigate to="/terminal" replace /> :
          <Navigate to="/classic" replace />
        } />
        
        {/* Catch all - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
