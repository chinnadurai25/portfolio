import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentExp, setCurrentExp] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form states
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('experience')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setExperiences(data);
        } catch (error) {
            console.error("Error fetching experience:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const expData = {
                role,
                company,
                duration,
                description
            };

            if (currentExp) {
                // Update
                const { error } = await supabase
                    .from('experience')
                    .update(expData)
                    .eq('id', currentExp.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('experience')
                    .insert([expData]);
                if (error) throw error;
            }

            resetForm();
            fetchExperiences();
        } catch (error) {
            console.error("Error saving experience:", error);
            alert("Failed to save experience");
        }
    };

    const handleEdit = (exp) => {
        setCurrentExp(exp);
        setRole(exp.role);
        setCompany(exp.company);
        setDuration(exp.duration);
        setDescription(exp.description);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this experience entry?")) return;
        try {
            const { error } = await supabase
                .from('experience')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchExperiences();
        } catch (error) {
            console.error("Error deleting experience:", error);
        }
    };

    const resetForm = () => {
        setCurrentExp(null);
        setRole('');
        setCompany('');
        setDuration('');
        setDescription('');
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Experience</h2>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl font-bold text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                        <FaPlus /> Add Experience
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
                        <h3 className="text-xl font-bold">{currentExp ? 'Edit Experience' : 'New Experience'}</h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-200"><FaTimes /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Role</label>
                                <input type="text" required value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="e.g. Frontend Developer" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Company</label>
                                <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="e.g. Google" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Duration</label>
                                <input type="text" required value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="e.g. Jan 2022 - Present" />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Description</label>
                            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="What did you do there?"></textarea>
                        </div>

                        <button type="submit" className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-cyan-600 transition-colors w-full flex justify-center items-center gap-2">
                            <FaSave /> {currentExp ? 'Update Experience' : 'Save Experience'}
                        </button>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center text-slate-400 py-10">Loading experience...</div>
                ) : experiences.length === 0 ? (
                    <div className="text-center text-slate-400 py-10 glass dark:glass-dark rounded-[2rem]">No experience found. Add one above.</div>
                ) : (
                    experiences.map(exp => (
                        <div key={exp.id} className="glass dark:glass-dark p-6 rounded-[2rem] flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <h4 className="font-black text-xl mb-1 text-cyan-500">{exp.role}</h4>
                                <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{exp.company} <span className="text-slate-400 font-normal">| {exp.duration}</span></p>
                                <p className="text-sm text-slate-400 line-clamp-2">{exp.description}</p>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2">
                                <button onClick={() => handleEdit(exp)} className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-colors"><FaEdit /></button>
                                <button onClick={() => handleDelete(exp.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminExperience;
