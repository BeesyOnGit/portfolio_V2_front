import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import type { Experience } from '../../types';

const emptyExperience: Experience = {
  role: '',
  company: '',
  period: '',
  description: [],
  achievements: []
};

const ExperienceEditor: React.FC = () => {
  const { experienceData, setExperienceData } = useAppContext();
  const [formData, setFormData] = useState<Experience>(emptyExperience);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'description' || name === 'achievements') {
        setFormData(prev => ({ ...prev, [name]: value.split('\n') }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(experienceData[index]);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
        setExperienceData(experienceData.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedData = [...experienceData];
      updatedData[editingIndex] = formData;
      setExperienceData(updatedData);
    } else {
      setExperienceData([...experienceData, formData]);
    }
    setFormData(emptyExperience);
    setEditingIndex(null);
  };

  const formTitle = editingIndex !== null ? 'Edit Experience' : 'Add New Experience';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-cyan">Manage Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#24283b] p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-medium dark:text-white">{formTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" required className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" required className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        </div>
        <input type="text" name="period" value={formData.period} onChange={handleChange} placeholder="Period (e.g., 2020 - Present)" required className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <textarea name="description" value={formData.description.join('\n')} onChange={handleChange} placeholder="Description (one point per line)" rows={3} className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <textarea name="achievements" value={formData.achievements.join('\n')} onChange={handleChange} placeholder="Achievements (one point per line)" rows={3} className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingIndex !== null ? 'Update' : 'Add'}</button>
            {editingIndex !== null && <button type="button" onClick={() => { setEditingIndex(null); setFormData(emptyExperience); }} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>}
        </div>
      </form>

      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <div key={index} className="bg-white dark:bg-[#24283b] p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-bold dark:text-white">{exp.role} @ {exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(index)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded">Edit</button>
              <button onClick={() => handleDelete(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceEditor;
