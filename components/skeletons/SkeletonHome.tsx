import React from 'react';

export const SkeletonHome: React.FC = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="space-y-3 mt-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="flex gap-4 mt-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            ))}
        </div>
    </div>
);
