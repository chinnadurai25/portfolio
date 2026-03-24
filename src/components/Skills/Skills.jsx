import React from "react";
import { motion } from "framer-motion";

const skills = [
    { name: "React", level: 90, color: "bg-cyan-400" },
    { name: "JavaScript", level: 85, color: "bg-yellow-400" },
    { name: "Node.js", level: 80, color: "bg-green-500" },
    { name: "MongoDB", level: 75, color: "bg-green-600" },
    { name: "Tailwind CSS", level: 95, color: "bg-sky-400" },
    { name: "HTML/CSS", level: 95, color: "bg-orange-500" },
    { name: "Git", level: 85, color: "bg-red-500" },
    { name: "TypeScript", level: 70, color: "bg-blue-600" },
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                            Expertise
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            My Skills
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                            A comprehensive overview of my technical stack and proficiency across various modern technologies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="glass dark:glass-dark p-8 rounded-[2rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group"
                            >
                                <div className="flex justify-between items-end mb-6">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors tracking-tight">
                                        {skill.name}
                                    </h3>
                                    <span className="text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-wider">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800/50 h-2.5 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/30">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                        className={`h-full ${skill.color} rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]`}
                                    ></motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
