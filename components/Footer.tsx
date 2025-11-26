import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigation } from "../hooks/useNavigation";

const Footer: React.FC = () => {
    const { siteData } = useAppContext();
    const { navigateToAdmin } = useNavigation();

    const handleAdminClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigateToAdmin();
    };

    return (
        <footer className="bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
                <p>
                    &copy; {new Date().getFullYear()} {siteData.name}. All Rights Reserved.
                </p>
                <div className="mt-2 text-xs">
                    <a onClick={handleAdminClick} className="hover:underline">
                        Admin
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
