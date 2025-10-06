
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Experience from '../pages/Experience';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

const ClassicLayout: React.FC = () => {
  const { currentPage } = useAppContext();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default ClassicLayout;
   