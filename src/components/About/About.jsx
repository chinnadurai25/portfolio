import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-20 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            About Me
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative aspect-square rounded-2xl bg-slate-800 overflow-hidden border border-slate-700">
                                <img
                                    src="/images/profile.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 text-slate-300 leading-relaxed">
                            <p>
                                I am a passionate Full Stack Developer with a strong focus on building
                                high-quality web applications. My journey in web development started
                                with curiosity and has evolved into a professional career where I
                                solve complex problems through code.
                            </p>
                            <p>
                                I specialize in the MERN stack (MongoDB, Express.js, React, Node.js)
                                and have a keen eye for UI/UX design. I believe in writing clean,
                                maintainable code and staying updated with the latest industry
                                trends.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
                                    <h4 className="text-2xl font-bold text-white mb-1">2+</h4>
                                    <span className="text-sm text-slate-400">Years Experience</span>
                                </div>
                                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
                                    <h4 className="text-2xl font-bold text-white mb-1">10+</h4>
                                    <span className="text-sm text-slate-400">Projects Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
