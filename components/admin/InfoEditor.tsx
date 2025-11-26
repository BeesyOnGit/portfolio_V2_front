import React, { useState, useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import type { SiteData } from "../../types";

const InfoEditor: React.FC = () => {
    const { siteData, setSiteData } = useAppContext();
    const [formData, setFormData] = useState<SiteData>(siteData);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Prefill form with current data when siteData changes
    useEffect(() => {
        setFormData(siteData);
    }, [siteData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, bio: e.target.value.split("\n") }));
    };

    const handleSocialChange = (index: number, field: "name" | "url", value: string) => {
        const newSocials = [...formData.socials];
        newSocials[index] = { ...newSocials[index], [field]: value };
        setFormData((prev) => ({ ...prev, socials: newSocials }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSaved(false);

        try {
            await setSiteData(formData); // This calls the API
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError("Failed to save changes. Please try again.");
            console.error("Error saving site data:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Personal Information
            </h2>

            {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">{error}</div>}

            {saved && <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500">Saved successfully!</div>}

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-2xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="John Doe"
                            value={formData?.name || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Full Stack Developer"
                            value={formData?.title || ""}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                        Bio (one paragraph per line)
                    </label>
                    <textarea
                        name="bio"
                        id="bio"
                        placeholder="Write your bio here...\nYou can add multiple paragraphs"
                        value={formData?.bio?.join("\n") || ""}
                        onChange={handleBioChange}
                        rows={4}
                        className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Social Links</label>
                    <div className="space-y-3 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                        {formData?.socials?.map((social, index) => (
                            <div key={index} className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    value={social?.name || ""}
                                    onChange={(e) => handleSocialChange(index, "name", e.target.value)}
                                    placeholder="Platform"
                                    disabled
                                    className="w-1/3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                                />
                                <input
                                    type="url"
                                    value={social?.url || ""}
                                    onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                    placeholder="https://..."
                                    className="w-2/3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-600"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default InfoEditor;
