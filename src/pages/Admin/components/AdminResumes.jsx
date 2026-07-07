import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase';
import { FaTrash, FaUpload, FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminResumes = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeName, setResumeName] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            if (data) setResumes(data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!resumeFile || !resumeName) return;

        setIsUploading(true);
        try {
            // Upload file to Supabase Storage
            const fileExt = resumeFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `resumes/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio_resumes')
                .upload(filePath, resumeFile);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: publicUrlData } = supabase.storage
                .from('portfolio_resumes')
                .getPublicUrl(filePath);

            const downloadUrl = publicUrlData.publicUrl;

            // Save to database
            const { error: dbError } = await supabase
                .from('resumes')
                .insert([
                    { name: resumeName, url: downloadUrl }
                ]);

            if (dbError) throw dbError;

            // Reset form and refresh list
            setResumeFile(null);
            setResumeName('');
            fetchResumes();
        } catch (error) {
            console.error("Error uploading resume:", error);
            alert("Error uploading resume. Check console.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id, url) => {
        if (!window.confirm("Are you sure you want to delete this resume?")) return;

        try {
            // Extract file path from URL to delete from storage
            const urlParts = url.split('/');
            const filePath = `resumes/${urlParts[urlParts.length - 1]}`;

            await supabase.storage
                .from('portfolio_resumes')
                .remove([filePath]);

            // Delete from database
            const { error } = await supabase
                .from('resumes')
                .delete()
                .match({ id });

            if (error) throw error;
            
            fetchResumes();
        } catch (error) {
            console.error("Error deleting resume:", error);
            alert("Error deleting resume.");
        }
    };

    return (
        <div className="glass dark:glass-dark p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border-white/20 dark:border-slate-700/50 max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Resume Manager</h2>

            <form onSubmit={handleUpload} className="mb-10 space-y-6 bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Resume Name</label>
                        <input
                            type="text"
                            required
                            value={resumeName}
                            onChange={(e) => setResumeName(e.target.value)}
                            placeholder="e.g. Fullstack Developer Resume"
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Upload File (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            required
                            onChange={(e) => setResumeFile(e.target.files[0])}
                            className="w-full px-4 py-2 bg-white dark:bg-slate-900 rounded-xl outline-none focus:ring-2 ring-cyan-500 text-sm text-slate-700 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-cyan-500/10 file:text-cyan-500 hover:file:bg-cyan-500 hover:file:text-white file:transition-all cursor-pointer"
                        />
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={isUploading || !resumeFile || !resumeName}
                    className="w-full py-4 bg-cyan-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <FaUpload />
                    {isUploading ? 'Uploading...' : 'Upload Resume'}
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Available Resumes</h3>
                {loading ? (
                    <div className="text-center py-10 text-slate-400">Loading resumes...</div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 glass dark:glass-dark rounded-[2rem]">No resumes uploaded yet.</div>
                ) : (
                    resumes.map(resume => (
                        <motion.div 
                            key={resume.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                                    <FaFilePdf size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{resume.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                                            {new Date(resume.created_at).toLocaleDateString()}
                                        </p>
                                        <a href={resume.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-500 uppercase tracking-widest hover:underline ml-2">
                                            View PDF
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(resume.id, resume.url)}
                                className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shrink-0 ml-4"
                                title="Delete Resume"
                            >
                                <FaTrash />
                            </button>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminResumes;
