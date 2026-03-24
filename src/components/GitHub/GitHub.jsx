import React from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from 'react-github-calendar';


const GitHub = () => {
    return (
        <section id="github" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                            Activity
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Days I Code
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl mb-16 mx-auto">
                        {/* GitHub Stats Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass dark:glass-dark p-8 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all flex justify-center overflow-hidden"
                        >
                            <img
                                src="https://github-readme-streak-stats.herokuapp.com/?user=chinnadurai25&theme=tokyonight&hide_border=true"
                                alt="GitHub Streak"
                                className="w-full max-w-md filter dark:brightness-110"
                            />
                        </motion.div>

                        {/* Top Languages Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="glass dark:glass-dark p-8 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex justify-center overflow-hidden"
                        >
                            <img
                                src="https://github-readme-stats.vercel.app/api/top-langs/?username=chinnadurai25&layout=compact&theme=tokyonight&hide_border=true"
                                alt="Top Languages"
                                className="w-full max-w-md filter dark:brightness-110"
                            />
                        </motion.div>
                    </div>

                    {/* Calender Heatmap */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="glass dark:glass-dark p-10 rounded-[3rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all w-full max-w-5xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 text-center tracking-tight italic">Contribution Graph</h3>
                        <div className="flex justify-center items-center overflow-x-auto pb-4 custom-scrollbar">
                            <GitHubCalendar
                                username="chinnadurai25"
                                colorScheme="dark"
                                fontSize={12}
                                blockSize={14}
                                blockMargin={4}
                                theme={{
                                    dark: ['#cbd5e1', '#06b6d4', '#0891b2', '#155e75', '#0e7490'],
                                }}
                                style={{
                                    color: '#94a3b8',
                                }}
                            />
                        </div>
                    </motion.div>

                    <div className="mt-12 text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <p>Explore more on <a href="https://github.com/chinnadurai25" target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-8">GitHub Profile</a></p>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default GitHub;
