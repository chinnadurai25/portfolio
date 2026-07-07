import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { FaTrash, FaEdit, FaPlus, FaGithub, FaExternalLinkAlt, FaTimes, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUploadingImage(true);
        try {
            let finalImageUrl = imageUrl;

            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio_images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('portfolio_images')
                    .getPublicUrl(filePath);
                    
                finalImageUrl = data.publicUrl;
            }

            const projectData = {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                github_url: githubUrl,
                live_url: liveUrl,
                image_url: finalImageUrl
            };

            if (currentProject) {
                // Update
                const { error } = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', currentProject.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('projects')
                    .insert([projectData]);
                if (error) throw error;
            }

            resetForm();
            fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleEdit = (project) => {
        setCurrentProject(project);
        setTitle(project.title);
        setDescription(project.description);
        setTags(project.tags ? project.tags.join(', ') : '');
        setGithubUrl(project.github_url || '');
        setLiveUrl(project.live_url || '');
        setImageUrl(project.image_url || '');
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const resetForm = () => {
        setCurrentProject(null);
        setTitle('');
        setDescription('');
        setTags('');
        setGithubUrl('');
        setLiveUrl('');
        setImageUrl('');
        setImageFile(null);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Projects</h2>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl font-bold text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                        <FaPlus /> Add Project
                    </button>
                )}
            </div>

            {isEditing && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass dark:glass-dark p-6 rounded-[2rem] border border-cyan-500/20 mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">{currentProject ? 'Edit Project' : 'New Project'}</h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-200"><FaTimes /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Title</label>
                                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="Project Title" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Tags (comma separated)</label>
                                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="React, Tailwind, Supabase" />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Description</label>
                            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="Detailed description of the project..."></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">GitHub URL</label>
                                <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="https://github.com/..." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Live URL</label>
                                <input type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Image Upload</label>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600" />
                                {imageUrl && !imageFile && <p className="text-xs text-slate-500 mt-2 truncate">Current: {imageUrl}</p>}
                            </div>
                        </div>

                        <button type="submit" disabled={uploadingImage} className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-cyan-600 transition-colors w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <FaSave /> {uploadingImage ? 'Saving...' : currentProject ? 'Update Project' : 'Save Project'}
                        </button>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-10">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-slate-400 py-10 glass dark:glass-dark rounded-[2rem]">No projects found. Add one above.</div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="glass dark:glass-dark p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {project.image_url && (
                                <img src={project.image_url} alt={project.title} className="w-full md:w-32 h-20 object-cover rounded-xl" />
                            )}
                            <div className="flex-1">
                                <h4 className="font-black text-xl mb-1">{project.title}</h4>
                                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                                <div className="flex gap-2 flex-wrap mb-3">
                                    {project.tags?.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 bg-cyan-500/10 text-cyan-500 text-[10px] uppercase font-bold tracking-wider rounded-lg">{tag}</span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><FaGithub /></a>}
                                    {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white"><FaExternalLinkAlt /></a>}
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2">
                                <button onClick={() => handleEdit(project)} className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-colors"><FaEdit /></button>
                                <button onClick={() => handleDelete(project.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
