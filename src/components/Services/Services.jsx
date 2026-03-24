import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaServer, FaDatabase, FaRocket } from "react-icons/fa";

const services = [
    {
        title: "Web Development",
        description: "Building responsive, high-performance websites and web applications using React, Next.js, and modern technologies.",
        icon: <FaLaptopCode />
    },
    {
        title: "App Development",
        description: "Creating cross-platform mobile applications for iOS and Android using React Native with seamless user experiences.",
        icon: <FaMobileAlt />
    },
    {
        title: "UI/UX Design",
        description: "Designing intuitive and visually appealing user interfaces that enhance user engagement and satisfaction.",
        icon: <FaPaintBrush />
    },
    {
        title: "Backend Development",
        description: "Developing robust server-side applications and APIs using Node.js, Express, and Django to power your products.",
        icon: <FaServer />
    },
    {
        title: "Database Management",
        description: "Efficiently organizing and securing data with SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) database solutions.",
        icon: <FaDatabase />
    },
    {
        title: "Project Deployment",
        description: "Deploying and managing applications on cloud platforms like AWS, Vercel, and Netlify for optimal performance.",
        icon: <FaRocket />
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 relative overflow-hidden">
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
                        Solutions
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        What I Offer
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                        I provide a wide range of top-tier services to help you build, deploy, and scale your digital presence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="glass dark:glass-dark p-10 rounded-[3rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
                            
                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl text-white mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-cyan-500/20">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                                {service.title}
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base font-medium">
                                {service.description}
                            </p>
                            
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Premium Service</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
