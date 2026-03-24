import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaTimes, FaEye } from "react-icons/fa";

const Hero = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-20 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-20 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-6 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-lg md:text-xl text-cyan-500 dark:text-cyan-400 font-bold mb-4 tracking-[0.2em] uppercase">
                        Hello, I am
                    </h2>
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                            Chinna durai
                        </span>
                    </h1>
                    <h3 className="text-2xl md:text-4xl text-slate-600 dark:text-slate-400 mb-10 font-medium tracking-tight">
                        Full Stack Developer & <span className="text-cyan-600 dark:text-cyan-400">UI Designer</span>
                    </h3>

                    <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-12 leading-relaxed text-lg md:text-xl font-light">
                        I build exceptional digital experiences that are <span className="text-slate-900 dark:text-slate-100 font-medium">fast, accessible,
                        visually appealing</span>, and responsive.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
                        >
                            View Projects
                        </a>
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                        >
                            Get Resume
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Resume Selection Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative glass dark:glass-dark p-8 rounded-[2rem] shadow-2xl w-full max-w-md border-white/20 dark:border-slate-700/50"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <FaTimes size={18} />
                            </button>

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">My Professional Resume</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Choose a version to view or download</p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="/resumes/ChinnaDurai_Resume_v1.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowModal(false)}
                                    className="flex items-center gap-5 p-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-cyan-500/5 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                                        <FaFilePdf size={24} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-slate-900 dark:text-white font-bold">Standard Resume</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 uppercase tracking-wider font-semibold">Version 1.0</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-400 group-hover:text-cyan-500 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20 transition-all">
                                        <FaEye size={18} />
                                    </div>
                                </a>

                                <a
                                    href="/resumes/ChinnaDurai_Resume_v2.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setShowModal(false)}
                                    className="flex items-center gap-5 p-5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-purple-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-purple-500/5 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                                        <FaFilePdf size={24} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="text-slate-900 dark:text-white font-bold">Enhanced Resume</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 uppercase tracking-wider font-semibold">Version 2.0</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-400 group-hover:text-purple-500 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-all">
                                        <FaEye size={18} />
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;
