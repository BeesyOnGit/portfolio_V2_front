import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import type { Technology } from "../../types";

const emptyTechnology: Technology = {
    id: "",
    name: "",
    image: "",
};

const TechnologiesEditor: React.FC = () => {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [formData, setFormData] = useState<Technology>(emptyTechnology);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadTechnologies();
    }, []);

    const loadTechnologies = async () => {
        try {
            const techs = await api.fetchTechnologies();
            setTechnologies(techs);
        } catch (err) {
            console.error("Failed to load technologies:", err);
            setError("Failed to load technologies");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setFormData(technologies[index]);
    };

    const handleDelete = async (index: number) => {
        if (window.confirm("Are you sure you want to delete this technology?")) {
            const technology = technologies[index];
            if (!technology.id) return;

            setLoading(true);
            setError("");
            try {
                await api.deleteTechnology(technology.id);
                const updatedData = technologies.filter((_, i) => i !== index);
                setTechnologies(updatedData);
                setSuccess("Technology deleted successfully!");
                setTimeout(() => setSuccess(""), 3000);
            } catch (err: any) {
                setError(err.message || "Failed to delete technology");
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
            if (editingIndex !== null) {
                const technology = technologies[editingIndex];
                if (!technology.id) return;

                await api.updateTechnology(technology.id, formData);
                const updatedData = [...technologies];
                updatedData[editingIndex] = { ...formData, id: technology.id };
                setTechnologies(updatedData);
                setSuccess("Technology updated successfully!");
            } else {
                const newTechnology = await api.createTechnology(formData);
                setTechnologies([...technologies, newTechnology]);
                setSuccess("Technology added successfully!");
            }
            setFormData(emptyTechnology);
            setEditingIndex(null);
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to save technology");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Technologies Management
            </h2>

            {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">{error}</div>}

            {success && <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500">{success}</div>}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-2xl mb-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Technology ID *</label>
                        <input
                            type="text"
                            name="id"
                            placeholder="react"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            disabled={editingIndex !== null}
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Unique identifier (lowercase, no spaces)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Technology Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="React"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        placeholder="https://example.com/logo.png"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional: URL to technology logo/icon</p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : editingIndex !== null ? "Update Technology" : "Add Technology"}
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-300 mb-4">Existing Technologies</h3>
                {technologies.length === 0 ? (
                    <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700/50">
                        <p className="text-gray-500">No technologies yet. Add your first technology above!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {technologies.map((tech, index) => (
                            <div
                                key={tech.id || index}
                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all hover:border-gray-600"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                                        <span className="text-xs text-gray-400 font-mono bg-gray-900/50 px-2 py-1 rounded">{tech.id}</span>
                                    </div>
                                    {tech.image && (
                                        <img
                                            src={tech.image}
                                            alt={tech.name}
                                            className="w-10 h-10 object-contain rounded"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechnologiesEditor;
