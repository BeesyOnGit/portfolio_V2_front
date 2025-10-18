import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import InfoEditor from '../../components/admin/InfoEditor';
import ExperienceEditor from '../../components/admin/ExperienceEditor';
import ProjectsEditor from '../../components/admin/ProjectsEditor';

type AdminPage = 'info' | 'experience' | 'projects';

const Dashboard: React.FC = () => {
    const { logout, siteData } = useAppContext();
    const [activePage, setActivePage] = useState<AdminPage>('info');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderContent = () => {
        switch (activePage) {
            case 'info':
                return <InfoEditor />;
            case 'experience':
                return <ExperienceEditor />;
            case 'projects':
                return <ProjectsEditor />;
            default:
                return <InfoEditor />;
        }
    }

    const NavItem: React.FC<{ page: AdminPage, children: React.ReactNode }> = ({ page, children }) => (
        <button
            onClick={() => setActivePage(page)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activePage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-dark-bg">
            <aside className="w-64 bg-white dark:bg-[#24283b] shadow-md flex flex-col p-4">
                <div className="text-center mb-8">
                    <h1 className="text-xl font-bold dark:text-dark-cyan">{siteData.name}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
                </div>
                <nav className="flex flex-col gap-2">
                    <NavItem page="info">Personal Info</NavItem>
                    <NavItem page="experience">Experience</NavItem>
                    <NavItem page="projects">Projects</NavItem>
                </nav>
                <div className="mt-auto space-y-2">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Portfolio
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-grow p-8 overflow-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
