import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import type { Project } from '../../types';

const emptyProject: Project = {
  id: '',
  name: '',
  description: '',
  tech: [],
  links: { demo: '', repo: '' },
  year: new Date().getFullYear(),
};

const ProjectsEditor: React.FC = () => {
  const { projectsData, setProjectsData } = useAppContext();
  const [formData, setFormData] = useState<Project>(emptyProject);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'tech') {
        setFormData(prev => ({ ...prev, tech: value.split(',').map(t => t.trim()) }));
    } else if (name === 'demo' || name === 'repo') {
        setFormData(prev => ({ ...prev, links: { ...prev.links, [name]: value } }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(projectsData[index]);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
        setProjectsData(projectsData.filter((_, i) => i !== index));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedData = [...projectsData];
      updatedData[editingIndex] = formData;
      setProjectsData(updatedData);
    } else {
      setProjectsData([...projectsData, formData]);
    }
    setFormData(emptyProject);
    setEditingIndex(null);
  };

  const formTitle = editingIndex !== null ? 'Edit Project' : 'Add New Project';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-cyan">Manage Projects</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-[#24283b] p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-medium dark:text-white">{formTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID (e.g., pro-analyzer)" required className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" required className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        </div>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <input type="text" name="tech" value={formData.tech.join(', ')} onChange={handleChange} placeholder="Tech Stack (comma-separated)" required className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="demo" value={formData.links?.demo} onChange={handleChange} placeholder="Demo URL" className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
            <input type="text" name="repo" value={formData.links?.repo} onChange={handleChange} placeholder="Repo URL" className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
            <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="block w-full rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
        </div>
        <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingIndex !== null ? 'Update' : 'Add'}</button>
            {editingIndex !== null && <button type="button" onClick={() => { setEditingIndex(null); setFormData(emptyProject); }} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Cancel</button>}
        </div>
      </form>

      <div className="space-y-4">
        {projectsData.map((project, index) => (
          <div key={index} className="bg-white dark:bg-[#24283b] p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-bold dark:text-white">{project.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{project.id}</p>
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

export default ProjectsEditor;
