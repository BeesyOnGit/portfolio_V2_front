import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const Home: React.FC = () => {
  const { setCurrentPage, siteData } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <img src={`https://i.pravatar.cc/128?u=${siteData.name}`} alt="Profile" className="rounded-full w-32 h-32 mb-6 ring-4 ring-gray-300 dark:ring-gray-600 shadow-lg" />
      <h1 className="text-4xl font-bold mb-2 dark:text-dark-cyan">{siteData.name}</h1>
      <h2 className="text-xl text-gray-600 dark:text-dark-fg mb-4">{siteData.title}</h2>
      <div className="max-w-2xl space-y-4 text-gray-700 dark:text-gray-300">
        {siteData.bio.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <button 
        onClick={() => setCurrentPage('projects')}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
      >
        View My Work
      </button>
    </div>
  );
};

export default Home;
