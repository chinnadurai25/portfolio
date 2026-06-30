import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCheck, FaTimes, FaLock, FaStar, FaSignOutAlt, FaUpload, FaFilePdf, FaEnvelope, FaPaperPlane, FaPhone } from 'react-icons/fa';
import { supabase } from '../supabase';
import emailjs from '@emailjs/browser';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Resume feature states
    const [activeTab, setActiveTab] = useState('requests');
    const [resumeFile, setResumeFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [resumeUrl, setResumeUrl] = useState(null);

    // EmailJS Reply Modal states
    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [isSendingReply, setIsSendingReply] = useState(false);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            setAuthLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const { data, error } = await supabase
                .from('feedback')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setFeedbacks(data);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };

    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('client_requests')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setRequests(data);
        } catch (error) {
            console.error("Error fetching client requests:", error);
        }
    };

    const fetchResume = async () => {
        try {
            const { data } = await supabase
                .from('settings')
                .select('url')
                .eq('id', 'resume')
                .single();
            if (data && data.url) {
                setResumeUrl(data.url);
            }
        } catch (error) {
            console.error("Error fetching resume URL:", error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        fetchFeedbacks();
        fetchRequests();
        fetchResume();

        // Subscribe to real-time feedback changes
        const feedbackChannel = supabase
            .channel('admin-feedback')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'feedback' }, () => {
                fetchFeedbacks();
            })
            .subscribe();

        // Subscribe to real-time request changes
        const requestsChannel = supabase
            .channel('admin-requests')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'client_requests' }, () => {
                fetchRequests();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(feedbackChannel);
            supabase.removeChannel(requestsChannel);
        };
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
        } catch (error) {
            console.error("Login Error:", error);
            alert("Incorrect Email or Password");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const toggleApproval = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('feedback')
                .update({ approved: !currentStatus })
                .eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error("Error updating feedback:", error);
            alert("Failed to update status.");
        }
    };

    const deleteFeedback = async (id) => {
        if (!window.confirm("Delete this feedback?")) return;
        try {
            const { error } = await supabase
                .from('feedback')
                .delete()
                .eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    const toggleRequestStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Reviewed' : 'Pending';
        try {
            const { error } = await supabase
                .from('client_requests')
                .update({ status: newStatus })
                .eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error("Error updating request status:", error);
            alert("Failed to update status.");
        }
    };

    const deleteRequest = async (id) => {
        if (!window.confirm("Delete this project request?")) return;
        try {
            const { error } = await supabase
                .from('client_requests')
                .delete()
                .eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyingTo || !replyMessage.trim()) return;
        
        setIsSendingReply(true);
        
        try {
            await emailjs.send(
                'service_wbu38eq',
                'template_riln4u4',
                {
                    to_email: replyingTo.email,
                    from_name: "Chinna Durai",
                    subject: `Regarding your ${replyingTo.service_type} project request - Chinna Durai`,
                    message: replyMessage
                },
                'cJfJnJ5ujGELaY-om'
            );
            
            alert("Email sent successfully!");
            setReplyModalOpen(false);
            setReplyMessage('');
            
            // Automatically mark as reviewed if it was pending
            if (replyingTo.status === 'Pending') {
                await toggleRequestStatus(replyingTo.id, replyingTo.status);
            }
        } catch (error) {
            console.error("Failed to send email:", error);
            alert("Failed to send email. Please try again.");
        } finally {
            setIsSendingReply(false);
        }
    };

    const handleResumeUpload = async (e) => {
        e.preventDefault();
        if (!resumeFile) return;

        setIsUploading(true);
        
        try {
            const fileName = `${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
            const filePath = `resumes/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, resumeFile, { upsert: true });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
            const downloadURL = data.publicUrl;

            const { error: dbError } = await supabase
                .from('settings')
                .upsert({ id: 'resume', url: downloadURL, path: filePath });

            if (dbError) throw dbError;

            setResumeUrl(downloadURL);
            setResumeFile(null);
            alert("Resume uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload resume.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteResume = async () => {
        if (!window.confirm("Are you sure you want to delete the current resume? This cannot be undone.")) return;
        
        try {
            const { data: resumeData } = await supabase
                .from('settings')
                .select('path')
                .eq('id', 'resume')
                .single();

            if (resumeData && resumeData.path) {
                await supabase.storage.from('resumes').remove([resumeData.path]);
            }

            await supabase.from('settings').delete().eq('id', 'resume');
            
            setResumeUrl(null);
            alert("Resume deleted.");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete resume. It may have already been removed from storage.");
            await supabase.from('settings').delete().eq('id', 'resume');
            setResumeUrl(null);
        }
    };

    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading Admin Secure Area...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass dark:glass-dark p-12 rounded-[3rem] w-full max-w-md text-center"
                >
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-500 mx-auto mb-8">
                        <FaLock size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input
                            type="email"
                            placeholder="Admin Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 ring-cyan-500 outline-none text-center text-slate-900 dark:text-white"
                        />
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 ring-cyan-500 outline-none text-center text-slate-900 dark:text-white"
                        />
                        <button type="submit" className="w-full py-4 bg-cyan-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-600 transition-colors">
                            Initialize Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
                    <button 
                        onClick={handleLogout} 
                        className="px-6 py-2 flex items-center gap-2 bg-red-500/10 text-red-500 rounded-full font-bold text-sm hover:bg-red-500 hover:text-white transition-colors"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'requests' ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        Client Requests ({requests.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('feedback')}
                        className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'feedback' ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        Feedback ({feedbacks.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('resume')}
                        className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'resume' ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                        Resume Manager
                    </button>
                </div>

                {activeTab === 'requests' && (
                    <div className="grid gap-6">
                        {requests.length === 0 ? (
                            <div className="glass dark:glass-dark p-20 rounded-[3rem] text-center text-slate-400">
                                No client requests found yet.
                            </div>
                        ) : (
                            requests.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="glass dark:glass-dark p-8 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row gap-8 items-start"
                                >
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-black text-2xl text-slate-900 dark:text-white">{item.name}</h3>
                                                <a href={`mailto:${item.email}`} className="text-xs text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer" title="Click to email">({item.email})</a>
                                                {item.contact_number && (
                                                    <a 
                                                        href={`tel:${item.contact_number}`} 
                                                        className="text-xs text-slate-400 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center gap-2 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors cursor-pointer"
                                                        title="Click to call"
                                                    >
                                                        <FaPhone className="text-[10px]" /> {item.contact_number}
                                                    </a>
                                                )}
                                            </div>
                                            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-500 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">
                                                {item.service_type}
                                            </span>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Project Details:</h4>
                                            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                                                {item.message}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4">
                                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                                                Received on {new Date(item.created_at).toLocaleDateString()}
                                            </p>
                                            
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        setReplyingTo(item);
                                                        setReplyMessage('');
                                                        setReplyModalOpen(true);
                                                    }}
                                                    className="px-6 py-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center gap-2"
                                                >
                                                    <FaEnvelope /> Reply
                                                </button>
                                                <button
                                                    onClick={() => toggleRequestStatus(item.id, item.status)}
                                                    className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                                                        item.status === 'Reviewed'
                                                        ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white" 
                                                        : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                                                    }`}
                                                >
                                                    {item.status === 'Reviewed' ? <FaCheck /> : <FaTimes />}
                                                    {item.status}
                                                </button>
                                                <button
                                                    onClick={() => deleteRequest(item.id)}
                                                    className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'feedback' && (
                    <div className="grid gap-6">
                        {feedbacks.length === 0 ? (
                            <div className="glass dark:glass-dark p-20 rounded-[3rem] text-center text-slate-400">
                                No feedback submissions found.
                            </div>
                        ) : (
                            feedbacks.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="glass dark:glass-dark p-8 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row gap-8 items-start md:items-center"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-black text-xl text-slate-900 dark:text-white">{item.name}</h3>
                                            <a href={`mailto:${item.email}`} className="text-xs text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer" title="Click to email">({item.email})</a>
                                        </div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-500 text-xs" />
                                            ))}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">"{item.message}"</p>
                                        <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
                                            Submitted on {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button
                                            onClick={() => toggleApproval(item.id, item.approved)}
                                            className={`flex-1 md:flex-none px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                                item.approved 
                                                ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white" 
                                                : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                                            }`}
                                        >
                                            {item.approved ? <FaCheck /> : <FaTimes />}
                                            {item.approved ? "Approved" : "Pending"}
                                        </button>
                                        <button
                                            onClick={() => deleteFeedback(item.id)}
                                            className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'resume' && (
                    <div className="glass dark:glass-dark p-12 rounded-[3rem] border-white/20 dark:border-slate-700/50 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Resume Manager</h2>
                        
                        <div className="mb-10 p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                                        <FaFilePdf size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Current Resume Live</h3>
                                        <a href={resumeUrl || "/resumes/ChinnaDurai_Resume_v1.pdf"} target="_blank" rel="noopener noreferrer" className="text-cyan-500 text-sm hover:underline">
                                            View Live Resume {resumeUrl ? "(Custom Upload)" : "(Default)"}
                                        </a>
                                    </div>
                                </div>
                                {resumeUrl && (
                                    <button
                                        onClick={handleDeleteResume}
                                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                        title="Delete Custom Resume"
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleResumeUpload} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Upload New Resume (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-cyan-500/10 file:text-cyan-500 hover:file:bg-cyan-500 hover:file:text-white file:transition-all cursor-pointer"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={!resumeFile || isUploading}
                                className="w-full py-4 bg-cyan-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <FaUpload />
                                {isUploading ? 'Uploading...' : 'Upload & Publish Resume'}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Email Reply Modal */}
            {replyModalOpen && replyingTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass dark:glass-dark p-8 md:p-12 rounded-[3rem] w-full max-w-2xl border-white/20 dark:border-slate-700/50 relative"
                    >
                        <button 
                            onClick={() => setReplyModalOpen(false)}
                            className="absolute top-8 right-8 w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <FaTimes />
                        </button>
                        
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                                <FaEnvelope className="text-cyan-500" /> Reply to {replyingTo.name}
                            </h2>
                            <p className="text-slate-500 text-sm">Sending to: {replyingTo.email}</p>
                        </div>

                        <form onSubmit={handleSendReply} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">Your Message</label>
                                <textarea
                                    rows="8"
                                    required
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your response here..."
                                    className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 transition-all resize-none focus:ring-4 focus:ring-cyan-500/10 font-medium"
                                ></textarea>
                            </div>
                            
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setReplyModalOpen(false)}
                                    className="px-8 py-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSendingReply}
                                    className="flex-1 py-4 bg-cyan-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-xs"
                                >
                                    {isSendingReply ? 'Sending...' : <><FaPaperPlane /> Send Email</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminFeedback;
