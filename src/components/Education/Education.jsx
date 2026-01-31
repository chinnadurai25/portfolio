import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from "react-icons/fa";

const education = [
    {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "Kamaraj College of Engineering and Technology",
        period: "2021 - 2025",
        description: "Focused on Data Structures, Algorithms, Web Development, and Database Management. Active member of the coding club.",
        status: "Completed"
    },
    {
        degree: "HSC (Higher Secondary)",
        institution: "Kamaraj School",
        period: "2020 - 2021",
        description: "Completed with distinction, majoring in Computer Science and Mathematics.",
        status: "Completed"
    }
];

const Education = () => {
    return (
        <section id="education" className="py-20 bg-slate-900/50 relative">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Education
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    <p className="mt-4 text-slate-400 text-center max-w-2xl">
                        My academic journey and qualifications.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/30 transition-all relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-blue-500"></div>

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                        {edu.degree}
                                    </h3>
                                    <div className="flex items-center text-cyan-400 mb-4">
                                        <FaUniversity className="mr-2" />
                                        <span className="font-medium">{edu.institution}</span>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed max-w-2xl">
                                        {edu.description}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-2 min-w-[140px]">
                                    <div className="flex items-center text-slate-400 text-sm bg-slate-700/50 px-3 py-1 rounded-full border border-slate-600/50">
                                        <FaCalendarAlt className="mr-2 text-cyan-500" />
                                        <span>{edu.period}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
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
