import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaCheck, FaTimes, FaLock, FaStar } from 'react-icons/fa';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const fetchAllFeedback = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/feedback");
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error("Error fetching admin feedback:", error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            fetchAllFeedback();
        } else {
            alert("Incorrect Password");
        }
    };

    const toggleApproval = async (id, currentStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/feedback/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approved: !currentStatus })
            });
            if (response.ok) fetchAllFeedback();
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    };

    const deleteFeedback = async (id) => {
        if (!window.confirm("Delete this feedback?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/admin/feedback/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) fetchAllFeedback();
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

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
                            type="password"
                            placeholder="Enter Admin Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 ring-cyan-500 outline-none text-center"
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
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Feedback Management</h1>
                    <div className="px-6 py-2 bg-cyan-500/10 text-cyan-500 rounded-full font-bold text-sm">
                        {feedbacks.length} Submissions
                    </div>
                </div>

                <div className="grid gap-6">
                    {feedbacks.length === 0 ? (
                        <div className="glass dark:glass-dark p-20 rounded-[3rem] text-center text-slate-400">
                            No feedback submissions found.
                        </div>
                    ) : (
                        feedbacks.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                className="glass dark:glass-dark p-8 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row gap-8 items-start md:items-center"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-black text-xl text-slate-900 dark:text-white">{item.name}</h3>
                                        <span className="text-xs text-slate-400">({item.email})</span>
                                    </div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-500 text-xs" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">"{item.message}"</p>
                                    <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
                                        Submitted on {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <button
                                        onClick={() => toggleApproval(item._id, item.approved)}
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
                                        onClick={() => deleteFeedback(item._id)}
                                        className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminFeedback;
