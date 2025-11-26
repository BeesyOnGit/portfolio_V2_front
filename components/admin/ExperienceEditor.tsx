import React, { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { api } from "../../services/api";
import type { Experience } from "../../types";

const emptyExperience: Experience = {
    role: "",
    company: "",
    start_period: "",
    end_period: "",
    description: [],
    achievements: [],
    technology_ids: [],
};

const ExperienceEditor: React.FC = () => {
    const { experienceData, setExperienceData } = useAppContext();
    const [formData, setFormData] = useState<Experience>(emptyExperience);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [technologies, setTechnologies] = useState<any[]>([]);
    console.log("🚀 ~ file: ExperienceEditor.tsx:24 ~ technologies:", technologies);
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
        if (name === "description" || name === "achievements") {
            setFormData((prev) => ({ ...prev, [name]: value.split("\n") }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        const exp = experienceData[index];
        setFormData(exp);
        setSelectedTechIds(exp.technology_ids || []);
    };

    const handleDelete = async (index: number) => {
        if (window.confirm("Are you sure you want to delete this experience?")) {
            const experience = experienceData[index];
            if (!experience.id) return;

            setLoading(true);
            setError("");
            try {
                await api.deleteExperience(experience.id);
                const updatedData = experienceData.filter((_, i) => i !== index);
                setExperienceData(updatedData);
                setSuccess("Experience deleted successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } catch (err: any) {
                setError(err.message || "Failed to delete experience");
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
                const experience = experienceData[editingIndex];
                if (!experience.id) return;

                await api.updateExperience(experience.id, dataToSubmit);
                const updatedData = [...experienceData];
                updatedData[editingIndex] = { ...dataToSubmit, id: experience.id };
                setExperienceData(updatedData);
                setSuccess("Experience updated successfully!");
            } else {
                const newExperience = await api.createExperience(dataToSubmit);
                setExperienceData([...experienceData, newExperience]);
                setSuccess("Experience added successfully!");
            }
            setFormData(emptyExperience);
            setSelectedTechIds([]);
            setEditingIndex(null);
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to save experience");
        } finally {
            setLoading(false);
        }
    };

    const toggleTechnology = (techId: string) => {
        setSelectedTechIds((prev) => (prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]));
    };

    const formTitle = editingIndex !== null ? "Edit Experience" : "Add New Experience";

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Experience Management
            </h2>

            {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">{error}</div>}

            {success && <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500">{success}</div>}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                            Role / Position *
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role || ""}
                            onChange={handleChange}
                            placeholder="Senior Software Engineer"
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                            Company *
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company || ""}
                            onChange={handleChange}
                            placeholder="Tech Corp Inc."
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="start_period" className="block text-sm font-medium text-gray-300 mb-2">
                            Start Period *
                        </label>
                        <input
                            type="text"
                            id="start_period"
                            name="start_period"
                            value={formData.start_period || ""}
                            onChange={handleChange}
                            placeholder="2020-01"
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="end_period" className="block text-sm font-medium text-gray-300 mb-2">
                            End Period <span className="text-gray-500">(leave empty if current)</span>
                        </label>
                        <input
                            type="text"
                            id="end_period"
                            name="end_period"
                            value={formData.end_period || ""}
                            onChange={handleChange}
                            placeholder="2023-12 or leave empty"
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                        Description <span className="text-gray-500">(one point per line)</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description?.join("\n") || ""}
                        onChange={handleChange}
                        placeholder="Led team of 5 developers&#10;Architected microservices infrastructure&#10;Implemented CI/CD pipelines"
                        rows={4}
                        className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                    />
                </div>

                <div>
                    <label htmlFor="achievements" className="block text-sm font-medium text-gray-300 mb-2">
                        Key Achievements <span className="text-gray-500">(one point per line)</span>
                    </label>
                    <textarea
                        id="achievements"
                        name="achievements"
                        value={formData.achievements?.join("\n") || ""}
                        onChange={handleChange}
                        placeholder="Reduced deployment time by 60%&#10;Increased code coverage to 85%&#10;Mentored 3 junior developers"
                        rows={4}
                        className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Technologies Used</label>
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 min-h-[100px]">
                        {technologies?.map((tech) => (
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : editingIndex !== null ? "Update Experience" : "Add Experience"}
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Existing Experience</h3>
                {experienceData.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <p className="text-gray-500">No experience added yet. Add your first experience above!</p>
                    </div>
                ) : (
                    experienceData?.map((exp, index) => (
                        <div
                            key={exp.id || index}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all hover:border-gray-600"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                    <p className="text-md text-blue-400 font-medium">{exp.company}</p>
                                    <span className="text-sm text-gray-400">
                                        {exp.start_period} - {exp.end_period || "Present"}
                                    </span>
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
                            {exp.technologies && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {exp.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExperienceEditor;
