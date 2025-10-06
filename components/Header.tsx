import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import type { Page } from '../contexts/AppContext';
import { SunIcon, MoonIcon, TerminalIcon } from './icons/UIIcons';

const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => {
    const { currentPage, setCurrentPage } = useAppContext();
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            {children}
        </button>
    );
};

const Header: React.FC = () => {
  const { setMode, theme, toggleTheme, siteData } = useAppContext();

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold dark:text-dark-cyan">{siteData.name}</span>
          </div>
          <div className="flex items-center gap-4">
             <nav className="hidden md:flex items-center gap-2">
                <NavLink page="home">Home</NavLink>
                <NavLink page="experience">Experience</NavLink>
                <NavLink page="projects">Projects</NavLink>
                <NavLink page="contact">Contact</NavLink>
            </nav>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setMode('terminal')}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Switch to Terminal Mode"
                >
                    <TerminalIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
