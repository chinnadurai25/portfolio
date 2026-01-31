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
        <section id="experience" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Experience
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="max-w-3xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 md:-ml-0.5 w-0.5 h-full bg-slate-700"></div>

                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className={`flex flex-col md:flex-row items-center justify-between mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="w-full md:w-5/12"></div>

                                <div className="absolute left-0 md:left-1/2 -ml-1.5 w-3 h-3 bg-cyan-500 rounded-full border-4 border-slate-900 z-10"></div>

                                <div className="w-full md:w-5/12 pl-8 md:pl-0">
                                    <div className={`p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/30 transition-all ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                        }`}>
                                        <span className="text-cyan-400 text-sm font-mono mb-2 block">{exp.period}</span>
                                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                                        <h4 className="text-slate-400 mb-3">{exp.company}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
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
