import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/feedback");
                const data = await response.json();
                setTestimonials(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-20 text-center"
                >
                    <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                        Feedback
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        What Others Say
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                        Hear from the amazing people I've worked with and the impact we've created together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="glass dark:glass-dark p-10 rounded-[3rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group relative overflow-hidden"
                        >
                            <FaQuoteLeft className="text-6xl text-cyan-500/10 dark:text-cyan-500/[0.05] absolute top-8 right-8 pointer-events-none" />

                            <div className="flex items-center gap-5 mb-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-cyan-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="relative w-16 h-16 rounded-2xl border-4 border-white dark:border-slate-800 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-xl">
                                        {item.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 tracking-tight">{item.name}</h4>
                                    <p className="text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest">Verified Reviewer</p>
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-base mb-8 italic relative z-10">
                                "{item.message || item.content}"
                            </p>

                            <div className="flex gap-1.5 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" size={14} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

