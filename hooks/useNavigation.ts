import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from './useAppContext';
import type { Mode, Page } from '../contexts/AppContext';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, currentPage, setMode } = useAppContext();

  const navigateToPage = useCallback((page: Page) => {
    const basePath = mode === 'terminal' ? '/terminal' : '/classic';
    const pagePath = page === 'home' ? '' : `/${page}`;
    navigate(`${basePath}${pagePath}`);
  }, [navigate, mode]);

  const navigateToAdmin = useCallback(() => {
    navigate('/admin');
  }, [navigate]);

  const navigateToMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    const basePath = newMode === 'terminal' ? '/terminal' : '/classic';
    const pagePath = currentPage === 'home' ? '' : `/${currentPage}`;
    navigate(`${basePath}${pagePath}`);
  }, [navigate, setMode, currentPage]);

  return {
    navigateToPage,
    navigateToAdmin,
    navigateToMode,
    location
  };
};