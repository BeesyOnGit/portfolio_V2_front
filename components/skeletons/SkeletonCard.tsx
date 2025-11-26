import React from 'react';

export const SkeletonCard: React.FC = () => (
    <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="mt-4 flex gap-2">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>
    </div>
);
