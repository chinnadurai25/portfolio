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
        <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            My Skills
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
                            >
                                <div className="flex justify-between items-end mb-4">
                                    <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                                        {skill.name}
                                    </h3>
                                    <span className="text-slate-400 text-sm">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full ${skill.color} rounded-full`}
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
