import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("http://localhost:5000/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    rating
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setRating(5);
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <section id="feedback" className="py-24 relative overflow-hidden bg-slate-100 dark:bg-slate-900/50">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col items-center mb-16 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                            Feedback
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Share Your Thoughts
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="glass dark:glass-dark p-10 rounded-[3rem] border-white/20 dark:border-slate-700/50 shadow-2xl space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 flex flex-col items-center">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</label>
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className="focus:outline-none transition-transform hover:scale-125"
                                            onClick={() => setRating(ratingValue)}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)}
                                        >
                                            <FaStar
                                                size={32}
                                                className={`transition-colors duration-200 ${
                                                    ratingValue <= (hover || rating)
                                                        ? "text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                                                        : "text-slate-300 dark:text-slate-700"
                                                }`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me what you think..."
                                className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white resize-none"
                            ></textarea>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
                        >
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Thank You!' : 'Submit Feedback'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Feedback;
