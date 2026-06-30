import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import { supabase } from "../../supabase";

const Hero = () => {
    const [resumeUrl, setResumeUrl] = useState("/resumes/ChinnaDurai_Resume_v1.pdf");
    const [isLoadingResume, setIsLoadingResume] = useState(true);

    useEffect(() => {
        const fetchResumeUrl = async () => {
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
                console.error("Error fetching dynamic resume URL:", error);
            } finally {
                setIsLoadingResume(false);
            }
        };
        fetchResumeUrl();
    }, []);

    const handleResumeClick = (e) => {
        if (isLoadingResume) {
            e.preventDefault();
            return;
        }
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
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleResumeClick}
                            className={`w-full sm:w-auto px-10 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${isLoadingResume ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            <FaFilePdf size={18} />
                            Get Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
