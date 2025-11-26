import React, { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { api } from "../../services/api";
import type { Project } from "../../types";

const emptyProject: Project = {
    id: "",
    name: "",
    description: "",
    tech: [],
    demo: "",
    repo: "",
    year: new Date().getFullYear(),
};

const ProjectsEditor: React.FC = () => {
    const { projectsData, setProjectsData } = useAppContext();
    const [formData, setFormData] = useState<Project>(emptyProject);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [technologies, setTechnologies] = useState<any[]>([]);
    const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);

    useEffect(() => {
        const loadTechnologies = async () => {
            try {
                const techs = await api.fetchTechnologies();
                setTechnologies(techs);
            } catch (err) {
                console.error("Failed to load technologies:", err);
            }
        };
        loadTechnologies();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        const proj = projectsData[index];
        setFormData(proj);
        setSelectedTechIds(proj.tech?.map((t) => t.id) || []);
    };

    const handleDelete = async (index: number) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            const project = projectsData[index];
            if (!project.id) return;

            setLoading(true);
            setError("");
            try {
                await api.deleteProject(project.id);
                const updatedData = projectsData.filter((_, i) => i !== index);
                setProjectsData(updatedData);
                setSuccess("Project deleted successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } catch (err: any) {
                setError(err.message || "Failed to delete project");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const dataToSubmit = { ...formData, technology_ids: selectedTechIds };

            if (editingIndex !== null) {
                const project = projectsData[editingIndex];
                if (!project.id) return;

                await api.updateProject(project.id, dataToSubmit);
                const updatedData = [...projectsData];
                updatedData[editingIndex] = { ...dataToSubmit, id: project.id };
                setProjectsData(updatedData);
                setSuccess("Project updated successfully!");
            } else {
                const newProject = await api.createProject(dataToSubmit);
                setProjectsData([...projectsData, newProject]);
                setSuccess("Project added successfully!");
            }
            setFormData(emptyProject);
            setSelectedTechIds([]);
            setEditingIndex(null);
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to save project");
        } finally {
            setLoading(false);
        }
    };

    const toggleTechnology = (techId: string) => {
        setSelectedTechIds((prev) => (prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]));
    };

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projects Management
            </h2>

            {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">{error}</div>}

            {success && <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500">{success}</div>}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="My Awesome Project"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                        <input
                            type="number"
                            name="year"
                            placeholder="2024"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <textarea
                        name="description"
                        placeholder="Brief description of your project..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Technologies Used</label>
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 min-h-[100px]">
                        {technologies.map((tech) => (
                            <button
                                key={tech.id}
                                type="button"
                                onClick={() => toggleTechnology(tech.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                                    selectedTechIds.includes(tech.id)
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                            >
                                {tech.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Demo Link</label>
                        <input
                            type="url"
                            name="demo"
                            placeholder="https://demo.example.com"
                            value={formData.demo || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Repository Link</label>
                        <input
                            type="url"
                            name="repo"
                            placeholder="https://github.com/user/repo"
                            value={formData.repo || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : editingIndex !== null ? "Update Project" : "Add Project"}
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Existing Projects</h3>
                {projectsData.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <p className="text-gray-500">No projects yet. Add your first project above!</p>
                    </div>
                ) : (
                    projectsData.map((project, index) => (
                        <div
                            key={project.id || index}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all hover:border-gray-600"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                                    <span className="text-sm text-gray-400">{project.year}</span>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        disabled={loading}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        disabled={loading}
                                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            {project.tech && project.tech.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
                                        >
                                            {typeof tech === "string" ? tech : tech.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {(project.demo || project.repo) && (
                                <div className="flex gap-3 text-sm">
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 hover:underline"
                                        >
                                            View Demo →
                                        </a>
                                    )}
                                    {project.repo && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-400 hover:text-purple-300 hover:underline"
                                        >
                                            View Code →
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsEditor;
