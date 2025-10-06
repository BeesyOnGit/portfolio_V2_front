import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import type { SiteData } from '../../types';

const InfoEditor: React.FC = () => {
  const { siteData, setSiteData } = useAppContext();
  const [formData, setFormData] = useState<SiteData>(siteData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(siteData);
  }, [siteData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, bio: e.target.value.split('\n') }));
  };

  const handleSocialChange = (index: number, field: 'name' | 'url', value: string) => {
    const newSocials = [...formData.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setFormData(prev => ({ ...prev, socials: newSocials }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSiteData(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-cyan">Edit Personal Info</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#24283b] p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio (one paragraph per line)</label>
          <textarea name="bio" id="bio" value={formData.bio.join('\n')} onChange={handleBioChange} rows={4} className="mt-1 block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>

        <div>
          <h3 className="text-lg font-medium dark:text-gray-200">Social Links</h3>
            {formData.socials.map((social, index) => (
                <div key={index} className="flex gap-4 items-center mt-2">
                    <input
                        type="text"
                        value={social.name}
                        onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                        placeholder="Name (e.g. GitHub)"
                        className="block w-1/3 rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"
                        disabled
                    />
                    <input
                        type="text"
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                        placeholder="URL"
                        className="block w-2/3 rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600 shadow-sm"
                    />
                </div>
            ))}
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save Changes
          </button>
          {saved && <span className="text-green-500">Saved successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default InfoEditor;
