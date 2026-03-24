import React from "react";
import { motion } from "framer-motion";

const experiences = [
    {
        id: 1,
        role: "Senior Front-End Developer",
        company: "Tech Solutions Inc.",
        period: "2023 - Present",
        description: "Leading the frontend team in rebuilding the core platform using Next.js and Tailwind CSS. Improved performance by 40%."
    },
    {
        id: 2,
        role: "Web Developer",
        company: "Creative Agency",
        period: "2021 - 2023",
        description: "Developed responsive websites for various clients. Collaborated with designers to implement pixel-perfect user interfaces."
    },
    {
        id: 3,
        role: "Junior Developer",
        company: "StartUp Hub",
        period: "2020 - 2021",
        description: "Assisted in backend development using Node.js and Express. Fixed bugs and implemented minor features."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
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
                            History
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Work Experience
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    </div>

                    <div className="max-w-5xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 md:-ml-0.5 w-0.5 h-full bg-slate-200 dark:bg-slate-800"></div>

                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center justify-between mb-16 last:mb-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="w-full md:w-[45%] hidden md:block"></div>

                                <div className="absolute left-0 md:left-1/2 -ml-2.5 w-5 h-5 bg-white dark:bg-slate-900 rounded-full border-4 border-cyan-500 z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

                                <div className="w-full md:w-[45%] pl-10 md:pl-0">
                                    <div className={`p-8 glass dark:glass-dark rounded-[2rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                        }`}>
                                        <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">
                                            {exp.period}
                                        </span>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{exp.role}</h3>
                                        <h4 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
