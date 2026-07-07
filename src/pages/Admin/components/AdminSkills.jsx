import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminSkills = () => {
    const [skills, setSkills] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form states
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Frontend');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setSkills(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const skillData = {
                name,
                category,
                icon
            };

            if (currentSkill) {
                // Update
                const { error } = await supabase
                    .from('skills')
                    .update(skillData)
                    .eq('id', currentSkill.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('skills')
                    .insert([skillData]);
                if (error) throw error;
            }

            resetForm();
            fetchSkills();
        } catch (error) {
            console.error("Error saving skill:", error);
            alert("Failed to save skill");
        }
    };

    const handleEdit = (skill) => {
        setCurrentSkill(skill);
        setName(skill.name);
        setCategory(skill.category);
        setIcon(skill.icon || '');
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;
        try {
            const { error } = await supabase
                .from('skills')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchSkills();
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    const resetForm = () => {
        setCurrentSkill(null);
        setName('');
        setCategory('Frontend');
        setIcon('');
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Skills</h2>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-xl font-bold text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
                    >
                        <FaPlus /> Add Skill
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
                        <h3 className="text-xl font-bold">{currentSkill ? 'Edit Skill' : 'New Skill'}</h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-slate-200"><FaTimes /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Skill Name</label>
                                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="e.g. React" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white">
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                    <option value="Tools">Tools</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Icon URL / Component name</label>
                                <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white" placeholder="URL or react-icon name" />
                            </div>
                        </div>

                        <button type="submit" className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-cyan-600 transition-colors w-full flex justify-center items-center gap-2">
                            <FaSave /> {currentSkill ? 'Update Skill' : 'Save Skill'}
                        </button>
                    </form>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <div className="col-span-full text-center text-slate-400 py-10">Loading skills...</div>
                ) : skills.length === 0 ? (
                    <div className="col-span-full text-center text-slate-400 py-10 glass dark:glass-dark rounded-[2rem]">No skills found. Add one above.</div>
                ) : (
                    skills.map(skill => (
                        <div key={skill.id} className="glass dark:glass-dark p-6 rounded-3xl flex justify-between items-center">
                            <div>
                                <h4 className="font-black text-lg mb-1">{skill.name}</h4>
                                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-500 text-[10px] uppercase font-bold tracking-wider rounded-lg">{skill.category}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(skill)} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"><FaEdit /></button>
                                <button onClick={() => handleDelete(skill.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminSkills;
