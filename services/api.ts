import type { SiteData, Experience, Project } from "../types";

const API_BASE_URL = "http://127.0.0.1:3001";

interface PaginatedApiResponse<T> {
    success: boolean;
    message: string;
    result: {
        total_count: number;
        current_count: number;
        next: boolean;
        total_pages: number;
        current_page: number;
        result: T[];
    };
    error: string | null;
}

export const api = {
    async fetchSiteData(): Promise<SiteData> {
        const response = await fetch(`${API_BASE_URL}/owner`);
        if (!response.ok) {
            throw new Error(`Failed to fetch site data: ${response.statusText}`);
        }
        const apiResponse: PaginatedApiResponse<SiteData> = await response.json();
        if (!apiResponse.success || apiResponse.error) {
            throw new Error(apiResponse.error || "Failed to fetch site data");
        }
        // Site data is always an array with one object
        return apiResponse.result.result[0];
    },

    async fetchExperience(): Promise<Experience[]> {
        const response = await fetch(`${API_BASE_URL}/experience`);
        if (!response.ok) {
            throw new Error(`Failed to fetch experience data: ${response.statusText}`);
        }
        const apiResponse: PaginatedApiResponse<Experience> = await response.json();
        if (!apiResponse.success || apiResponse.error) {
            throw new Error(apiResponse.error || "Failed to fetch experience data");
        }
        return apiResponse.result.result.reverse();
    },

    async fetchProjects(): Promise<Project[]> {
        const response = await fetch(`${API_BASE_URL}/project`);
        if (!response.ok) {
            throw new Error(`Failed to fetch projects data: ${response.statusText}`);
        }
        const apiResponse: PaginatedApiResponse<any> = await response.json();
        if (!apiResponse.success || apiResponse.error) {
            throw new Error(apiResponse.error || "Failed to fetch projects data");
        }
        // Map API response to our Project type (technologies -> tech)
        return apiResponse.result.result.map((project: any) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            tech: project.technologies || [],
            demo: project.demo,
            repo: project.repo,
            year: project.year,
        }));
    },

    async fetchTechnologies(): Promise<any[]> {
        const response = await fetch(`${API_BASE_URL}/technos`);
        if (!response.ok) {
            throw new Error(`Failed to fetch technologies: ${response.statusText}`);
        }
        const data = await response.json();
        return data.result.result;
    },

    async createTechnology(data: any): Promise<any> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/technos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create technology");
        }
        const result = await response.json();
        return result.result;
    },

    async updateTechnology(id: string, data: any): Promise<void> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/technos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update technology");
        }
    },

    async deleteTechnology(id: string): Promise<void> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/technos/${id}`, {
            method: "DELETE",
            headers: {
                ...(token && { Authorization: `${token}` }),
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete technology");
        }
    },

    async updateSiteData(data: SiteData): Promise<void> {
        const token = this.getAuthToken();
        const ownerId = data.id; // Get owner ID from the data

        if (!ownerId) {
            throw new Error("Owner ID is required to update site data");
        }

        const response = await fetch(`${API_BASE_URL}/owner/${ownerId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to update site data: ${response.statusText}`);
        }
    },

    async createExperience(data: Experience): Promise<Experience> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/experience`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create experience");
        }
        const result = await response.json();
        return result.result;
    },

    async updateExperience(id: string, data: Experience): Promise<void> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/experience/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update experience");
        }
    },

    async deleteExperience(id: string): Promise<void> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/experience/${id}`, {
            method: "DELETE",
            headers: {
                ...(token && { Authorization: `${token}` }),
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete experience");
        }
    },

    async createProject(data: Project): Promise<Project> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create project");
        }
        const result = await response.json();
        return result.result;
    },

    async updateProject(id: string, data: Project): Promise<void> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/project/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `${token}` }),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update project");
        }
    },

    async deleteProject(id: string): Promise<void> {
        const token = this.getAuthToken();
        const response = await fetch(`${API_BASE_URL}/project/${id}`, {
            method: "DELETE",
            headers: {
                ...(token && { Authorization: `${token}` }),
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete project");
        }
    },

    async login(
        username: string,
        password: string
    ): Promise<{ success: boolean; message?: string; token?: string; user_id?: string; name?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/owner/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.error || data.message || "Login failed" };
            }

            // API returns: { user_id, username, name, token }
            if (data.result) {
                const { name, token, user_id, username } = data.result;
                return {
                    success: true,
                    token,
                    user_id,
                    name,
                    message: "Login successful",
                };
            } else {
                return { success: false, message: "No token received from server" };
            }
        } catch (error) {
            return { success: false, message: "Network error. Please try again." };
        }
    },

    setAuthToken(token: string | null) {
        if (token) {
            localStorage.setItem("portfolio-token", token);
        } else {
            localStorage.removeItem("portfolio-token");
        }
    },

    getAuthToken(): string | null {
        return localStorage.getItem("portfolio-token");
    },
};
