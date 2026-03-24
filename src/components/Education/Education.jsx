import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUniversity } from "react-icons/fa";

const education = [
    {
        degree: "Bachelor's Degree",
        institution: "Kamaraj College of Engineering and Technology",
        period: "06/2022 - 06/2026",
        description: "Pursuing B.E. in Computer Science. CGPA: 8.2/10",
        status: "Pursuing"
    },
    {
        degree: "Higher Secondary",
        institution: "Sharon Matric Higher Secondary School",
        period: "04/2021 - 06/2022",
        description: "Completed with 74% in HSC.",
        status: "Completed"
    },
    {
        degree: "Secondary School",
        institution: "Sharon Matric Higher Secondary School",
        period: "04/2020 - 06/2021",
        description: "Completed with 65% in SSLC.",
        status: "Completed"
    }
];

const Education = () => {
    return (
        <section id="education" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-20 text-center"
                >
                    <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                        Learning
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Education
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                        My academic foundation and continuous learning journey in the world of technology.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-10">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="glass dark:glass-dark p-10 rounded-[2.5rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-blue-600"></div>

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 text-cyan-500 dark:text-cyan-400 mb-4">
                                        <div className="p-3 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/5 border border-cyan-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            <FaUniversity size={20} />
                                        </div>
                                        <span className="font-black uppercase tracking-widest text-[10px]">{edu.institution}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors tracking-tight leading-tight">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-medium text-sm md:text-base">
                                        {edu.description}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-3 min-w-[160px]">
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700/50 shadow-sm">
                                        <FaCalendarAlt className="mr-2 text-cyan-500" />
                                        <span>{edu.period}</span>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border shadow-sm ${
                                        edu.status === "Pursuing" 
                                        ? "text-blue-500 bg-blue-500/10 border-blue-500/20" 
                                        : "text-green-500 bg-green-500/10 border-green-500/20"
                                    }`}>
                                        {edu.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
