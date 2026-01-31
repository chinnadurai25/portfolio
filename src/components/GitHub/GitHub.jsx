import React from "react";
import { motion } from "framer-motion";


const GitHub = () => {
    return (
        <section id="github" className="py-20 bg-slate-900 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex flex-col items-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Days I Code
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mb-12">
                        {/* GitHub Stats Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all flex justify-center"
                        >
                            <img
                                src="https://github-readme-streak-stats.herokuapp.com/?user=chinnadurai25&theme=tokyonight&hide_border=true"
                                alt="GitHub Streak"
                                className="w-full max-w-md"
                            />
                        </motion.div>

                        {/* Top Languages Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all flex justify-center"
                        >
                            <img
                                src="https://github-readme-stats.vercel.app/api/top-langs/?username=chinnadurai25&layout=compact&theme=tokyonight&hide_border=true"
                                alt="Top Languages"
                                className="w-full max-w-md"
                            />
                        </motion.div>
                    </div>

                    {/* Calender Heatmap */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all w-full max-w-4xl overflow-hidden"
                    >
                        <h3 className="text-xl font-semibold text-white mb-6 text-center">Contribution Graph</h3>
                        <div className="flex justify-center overflow-x-auto pb-2">
                            <img
                                src="https://github-readme-activity-graph.vercel.app/graph?username=chinnadurai25&theme=tokyo-night&bg_color=1e293b&hide_border=true"
                                alt="Github Activity Graph"
                                className="min-w-[700px] w-full"
                            />
                        </div>
                    </motion.div>

                    <div className="mt-8 text-slate-400 text-sm">
                        <p>Check out my code on <a href="https://github.com/chinnadurai25" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">GitHub</a></p>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default GitHub;
