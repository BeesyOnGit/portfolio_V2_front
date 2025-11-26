import React from 'react';

export const SkeletonExperience: React.FC = () => (
    <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
        </div>
    </div>
);

export const SkeletonExperienceList: React.FC = () => (
    <div className="space-y-6">
        {[1, 2, 3].map((i) => (
            <SkeletonExperience key={i} />
        ))}
    </div>
);
