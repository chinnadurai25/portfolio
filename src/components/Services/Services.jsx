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
        <section id="services" className="py-20 bg-slate-900 relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        What I Offer
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    <p className="mt-4 text-slate-400 text-center max-w-2xl">
                        I provide a wide range of services to help you build and grow your digital presence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all group"
                        >
                            <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center text-3xl text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-slate-400 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
