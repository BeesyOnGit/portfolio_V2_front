import React from 'react';

export const SkeletonTerminal: React.FC = () => (
    <div className="animate-pulse space-y-3 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-3 bg-gray-600 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-600 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        ))}
    </div>
);
