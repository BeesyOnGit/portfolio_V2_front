
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Experience from '../pages/Experience';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

const ClassicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/classic" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default ClassicLayout;
   