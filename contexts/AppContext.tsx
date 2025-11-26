import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { SiteData, Experience, Project } from "../types";
import { api } from "../services/api";

// Import initial data as a fallback
import { siteData as initialSiteData } from "../data/site";
import { experienceData as initialExperienceData } from "../data/experience";
import { projectsData as initialProjectsData } from "../data/projects";

export type Mode = "terminal" | "classic";
export type Theme = "light" | "dark";
export type Page = "home" | "experience" | "projects" | "contact";

interface AppContextType {
    mode: Mode | null;
    theme: Theme;
    currentPage: Page;
    setMode: (mode: Mode) => void;
    setTheme: (theme: Theme) => void;
    setCurrentPage: (page: Page) => void;
    toggleTheme: () => void;

    // Admin Dashboard State
    isAuthenticated: boolean;
    authToken: string | null;
    login: (token: string) => void;
    logout: () => void;

    // Editable Data
    siteData: SiteData;
    experienceData: Experience[];
    projectsData: Project[];
    setSiteData: (data: SiteData) => void;
    setExperienceData: (data: Experience[]) => void;
    setProjectsData: (data: Project[]) => void;

    // Loading States
    isLoading: boolean;
    isLoadingSite: boolean;
    isLoadingExperience: boolean;
    isLoadingProjects: boolean;
    error: string | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const getStoredData = <T,>(key: string, fallback: T): T => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return fallback;
    }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setModeState] = useState<Mode | null>(null);
    const [theme, setThemeState] = useState<Theme>("dark");
    const [currentPage, setCurrentPageState] = useState<Page>("home");
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Admin and data state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [siteData, setSiteDataState] = useState<SiteData>(initialSiteData);
    const [experienceData, setExperienceDataState] = useState<Experience[]>(initialExperienceData);
    const [projectsData, setProjectsDataState] = useState<Project[]>(initialProjectsData);

    // Loading states
    const [isLoadingSite, setIsLoadingSite] = useState(true);
    const [isLoadingExperience, setIsLoadingExperience] = useState(true);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Effects for fetching data from API ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch site data
                const siteDataResponse = await api.fetchSiteData();
                setSiteDataState(siteDataResponse);
                setIsLoadingSite(false);
            } catch (err) {
                console.error("Error fetching site data:", err);
                setIsLoadingSite(false);
                // Keep using fallback data
            }

            try {
                // Fetch experience data
                const experienceDataResponse = await api.fetchExperience();
                setExperienceDataState(experienceDataResponse);
                setIsLoadingExperience(false);
            } catch (err) {
                console.error("Error fetching experience data:", err);
                setIsLoadingExperience(false);
                // Keep using fallback data
            }

            try {
                // Fetch projects data
                const projectsDataResponse = await api.fetchProjects();
                setProjectsDataState(projectsDataResponse);
                setIsLoadingProjects(false);
            } catch (err) {
                console.error("Error fetching projects data:", err);
                setIsLoadingProjects(false);
                // Keep using fallback data
            }
        };

        fetchData();
    }, []);

    // --- Effects for UI theme and initial load ---
    useEffect(() => {
        const storedTheme = localStorage.getItem("portfolio-theme") as Theme;
        const storedToken = api.getAuthToken();

        // Remove any stored mode preference from localStorage
        localStorage.removeItem("portfolio-mode");

        if (storedToken) {
            setAuthToken(storedToken);
            setIsAuthenticated(true);
        }

        const effectiveTheme = storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        setThemeState(effectiveTheme);
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            // Don't store mode in localStorage anymore
            localStorage.setItem("portfolio-theme", theme);
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, [theme, isInitialLoad]);

    // --- Callbacks for UI mode and theme ---
    const setMode = useCallback((newMode: Mode) => {
        setModeState(newMode);
    }, []);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);

    const setCurrentPage = useCallback((newPage: Page) => {
        setCurrentPageState(newPage);
    }, []);

    // --- Callbacks for Auth and Data ---
    const login = useCallback((token: string) => {
        setAuthToken(token);
        setIsAuthenticated(true);
        api.setAuthToken(token);
    }, []);

    const logout = useCallback(() => {
        setAuthToken(null);
        setIsAuthenticated(false);
        api.setAuthToken(null);
    }, []);

    const setSiteData = useCallback(async (data: SiteData) => {
        try {
            await api.updateSiteData(data);
            setSiteDataState(data); // Only update local state after successful API call
        } catch (err) {
            console.error("Error updating site data:", err);
            setError("Failed to update site data");
            throw err; // Re-throw so the component can handle it
        }
    }, []);

    const setExperienceData = useCallback((data: Experience[]) => {
        setExperienceDataState(data);
    }, []);

    const setProjectsData = useCallback((data: Project[]) => {
        setProjectsDataState(data);
    }, []);

    const isLoading = isLoadingSite || isLoadingExperience || isLoadingProjects;

    const contextValue = {
        mode,
        theme,
        currentPage,
        setMode,
        setTheme,
        setCurrentPage,
        toggleTheme,
        isAuthenticated,
        authToken,
        login,
        logout,
        siteData,
        experienceData,
        projectsData,
        setSiteData,
        setExperienceData,
        setProjectsData,
        isLoading,
        isLoadingSite,
        isLoadingExperience,
        isLoadingProjects,
        error,
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
