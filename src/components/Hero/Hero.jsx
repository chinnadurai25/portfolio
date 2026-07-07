import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import { supabase } from "../../supabase";
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    const [resumes, setResumes] = useState([]);
    const [isLoadingResumes, setIsLoadingResumes] = useState(true);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const { data } = await supabase
                    .from('resumes')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (data && data.length > 0) {
                    setResumes(data);
                }
            } catch (error) {
                console.error("Error fetching resumes:", error);
            } finally {
                setIsLoadingResumes(false);
            }
        };
        fetchResumes();
    }, []);

    const handleResumeClick = (e) => {
        e.preventDefault();
        if (isLoadingResumes) return;

        // Always open modal to show options
        setIsResumeModalOpen(true);
    };

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
                        {t('hero.greeting')}
                    </h2>
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                            {t('hero.name')}
                        </span>
                    </h1>
                    <h3 className="text-2xl md:text-4xl text-slate-600 dark:text-slate-400 mb-10 font-medium tracking-tight">
                        {t('hero.roles.0')} & <span className="text-cyan-600 dark:text-cyan-400">{t('hero.roles.1')}</span>
                    </h3>

                    <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 mb-12 leading-relaxed text-lg md:text-xl font-light">
                        {t('hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
                        >
                            {t('hero.view_work')}
                        </a>
                        <button
                            onClick={handleResumeClick}
                            className={`w-full sm:w-auto px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${isLoadingResumes ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            <FaFilePdf size={18} />
                            Get Resume
                        </button>
                    </div>
                </motion.div>
            </div>
            {/* Resume Selection Modal */}
            {isResumeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass dark:glass-dark p-6 md:p-8 rounded-[2rem] w-full max-w-md border-white/20 dark:border-slate-700/50 relative"
                    >
                        <button 
                            onClick={() => setIsResumeModalOpen(false)}
                            className="absolute top-4 right-4 w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <FaFilePdf className="text-cyan-500" /> Select Resume
                        </h3>

                        <div className="space-y-3">
                            {resumes.length === 0 && (
                                <a 
                                    href="/resumes/ChinnaDurai_Resume_v1.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => setIsResumeModalOpen(false)}
                                    className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-cyan-500 hover:text-white transition-all group"
                                >
                                    <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-white">Default Resume</span>
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </a>
                            )}
                            {resumes.map(resume => (
                                <a 
                                    key={resume.id}
                                    href={resume.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => setIsResumeModalOpen(false)}
                                    className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-cyan-500 hover:text-white transition-all group"
                                >
                                    <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-white">{resume.name}</span>
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default Hero;
