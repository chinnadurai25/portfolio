import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                            Introduction
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            About Me
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative aspect-square rounded-[2.5rem] bg-slate-200 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src="/images/profile.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Delivering <span className="text-cyan-600 dark:text-cyan-400 font-black italic underline decoration-cyan-500/30 underline-offset-8">modern solutions</span> for complex problems.
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
                                I am a passionate Full Stack Developer with a strong focus on building
                                high-quality web applications. My journey in web development started
                                with curiosity and has evolved into a professional career where I
                                solve complex problems through code.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium">
                                I specialize in the MERN stack (MongoDB, Express.js, React, Node.js)
                                and have a keen eye for UI/UX design. I believe in writing clean,
                                maintainable code and staying updated with the latest industry
                                trends.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                <div className="p-6 glass dark:glass-dark rounded-3xl border-white/20 dark:border-slate-700/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all group/box">
                                    <h4 className="text-4xl font-black text-cyan-600 dark:text-cyan-400 mb-2 group-hover/box:scale-110 transition-transform">2+</h4>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">Years Experience</span>
                                </div>
                                <div className="p-6 glass dark:glass-dark rounded-3xl border-white/20 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all group/box">
                                    <h4 className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 group-hover/box:scale-110 transition-transform">10+</h4>
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">Projects Done</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
