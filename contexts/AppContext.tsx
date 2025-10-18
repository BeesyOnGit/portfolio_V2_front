import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { SiteData, Experience, Project } from '../types';

// Import initial data as a fallback
import { siteData as initialSiteData } from '../data/site';
import { experienceData as initialExperienceData } from '../data/experience';
import { projectsData as initialProjectsData } from '../data/projects';

export type Mode = 'terminal' | 'classic';
export type Theme = 'light' | 'dark';
export type Page = 'home' | 'experience' | 'projects' | 'contact';

interface AppContextType {
  mode: Mode | null;
  theme: Theme;
  currentPage: Page;
  setMode: (mode: Mode) => void;
  setTheme: (theme: Theme) => void;
  setCurrentPage: (page: Page) => void;
  toggleTheme: () => void;
  
  // Admin Dashboard State
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;

  // Editable Data
  siteData: SiteData;
  experienceData: Experience[];
  projectsData: Project[];
  setSiteData: (data: SiteData) => void;
  setExperienceData: (data: Experience[]) => void;
  setProjectsData: (data: Project[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const getStoredData = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return fallback;
  }
};


export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<Mode | null>(null);
  const [theme, setThemeState] = useState<Theme>('dark');
  const [currentPage, setCurrentPageState] = useState<Page>('home');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Admin and data state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteData, setSiteDataState] = useState<SiteData>(() => getStoredData('portfolio-siteData', initialSiteData));
  const [experienceData, setExperienceDataState] = useState<Experience[]>(() => getStoredData('portfolio-experienceData', initialExperienceData));
  const [projectsData, setProjectsDataState] = useState<Project[]>(() => getStoredData('portfolio-projectsData', initialProjectsData));

  // --- Effects for UI mode, theme, and initial load ---
  useEffect(() => {
    const storedMode = localStorage.getItem('portfolio-mode') as Mode;
    const storedTheme = localStorage.getItem('portfolio-theme') as Theme;
    const authStatus = sessionStorage.getItem('portfolio-auth') === 'true';

    if (storedMode) setModeState(storedMode);
    setIsAuthenticated(authStatus);

    const effectiveTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setThemeState(effectiveTheme);
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
        if (mode) localStorage.setItem('portfolio-mode', mode);
        localStorage.setItem('portfolio-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
  }, [mode, theme, isInitialLoad]);

  // --- Effects for persisting data ---
  useEffect(() => {
    localStorage.setItem('portfolio-siteData', JSON.stringify(siteData));
  }, [siteData]);
  
  useEffect(() => {
    localStorage.setItem('portfolio-experienceData', JSON.stringify(experienceData));
  }, [experienceData]);

  useEffect(() => {
    localStorage.setItem('portfolio-projectsData', JSON.stringify(projectsData));
  }, [projectsData]);

  // --- Callbacks for UI mode and theme ---
  const setMode = useCallback((newMode: Mode) => {
    setModeState(newMode);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const setCurrentPage = useCallback((newPage: Page) => {
    setCurrentPageState(newPage);
  }, []);

  // --- Callbacks for Auth and Data ---
  const login = useCallback((password: string): boolean => {
    // In a real app, this would be a fetch call to a backend service.
    // For this example, we use hardcoded credentials.
    if (password === 'password') {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio-auth', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio-auth');
  }, []);

  const setSiteData = useCallback((data: SiteData) => setSiteDataState(data), []);
  const setExperienceData = useCallback((data: Experience[]) => setExperienceDataState(data), []);
  const setProjectsData = useCallback((data: Project[]) => setProjectsDataState(data), []);
  
  const contextValue = {
    mode,
    theme,
    currentPage,
    setMode,
    setTheme,
    setCurrentPage,
    toggleTheme,
    isAuthenticated,
    login,
    logout,
    siteData,
    experienceData,
    projectsData,
    setSiteData,
    setExperienceData,
    setProjectsData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
