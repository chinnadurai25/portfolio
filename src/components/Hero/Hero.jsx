import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-6 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl text-cyan-400 font-medium mb-4">
                        Hello, I am
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                        <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                            Chinna durai
                        </span>
                    </h1>
                    <h3 className="text-2xl md:text-4xl text-slate-400 mb-8 font-light">
                        Full Stack Developer
                    </h3>

                    <p className="max-w-2xl mx-auto text-slate-400 mb-10 leading-relaxed">
                        I build exceptional digital experiences that are fast, accessible,
                        visually appealing, and responsive.
                    </p>

                    <div className="flex justify-center gap-6">
                        <a
                            href="#projects"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 rounded-full border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 transition-all"
                        >
                            Contact Me
                        </a>
                        <a
                            href="/resume.pdf"
                            download="Chinnadurai_Resume.pdf"
                            className="px-8 py-3 rounded-full border border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-all flex items-center gap-2"
                        >
                            Download Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
