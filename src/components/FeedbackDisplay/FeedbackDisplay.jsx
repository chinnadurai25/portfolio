import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const FeedbackDisplay = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/feedback");
                const data = await response.json();
                setFeedbacks(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading) return null;
    if (feedbacks.length === 0) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                        Reviews
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        What Others Say
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {feedbacks.map((feedback, index) => (
                        <motion.div
                            key={feedback._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass dark:glass-dark p-8 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 relative group hover:shadow-2xl transition-all"
                        >
                            <FaQuoteLeft className="text-4xl text-cyan-500/10 absolute top-6 right-6" />
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                                    {feedback.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{feedback.name}</h4>
                                    <div className="flex gap-1">
                                        {[...Array(feedback.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-cyan-500 text-[10px]" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                                "{feedback.message}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeedbackDisplay;
