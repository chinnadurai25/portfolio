import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGlobe } from "react-icons/fa";

const liveProjects = [
    {
        title: "Fly Roll",
        url: "https://flyroll.flytowardsdigitalinnovation.com",
        description: "Web application under Fly Towards Digital Innovation for digital management."
    },
    {
        title: "Fly Towards Digital Innovation",
        url: "https://flytowardsdigitalinnovation.com",
        description: "Digital agency website highlighting services and technology solutions."
    },
    {
        title: "High Grip Socks",
        url: "https://highgripsocks.com",
        description: "E-commerce platform with product listings, cart and Razorpay payment integration."
    },
    {
        title: "JCL Siddha Academy",
        url: "https://jclsiddhaacademy.in",
        description: "Academy website for traditional Siddha medicine courses and enrollment."
    },
    {
        title: "Sanju Wind Energy",
        url: "https://sanjuwindenergy.com",
        description: "Professional website for a wind energy company showcasing services and projects."
    },
    {
        title: "Etosm Technology",
        url: "https://etosmtechnology.in",
        description: "Technology company website with products, services and innovative solutions."
    },
    {
        title: "Sriram First Step Play School",
        url: "https://sriramfirststepsplayschool.in",
        description: "School website with activities, admissions info and contact details."
    },
    {
        title: "Server Applications",
        url: "http://31.97.237.122:3005",
        description: "Two live deployed web applications hosted on dedicated server instances. (Ports 3005 & 3002)"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const LiveProjects = () => {
    return (
        <section id="live-projects" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/30">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none -z-10 rounded-full"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-16 text-center">
                        <h2 className="text-sm font-bold text-blue-500 dark:text-blue-400 tracking-[0.3em] uppercase mb-4">
                            Production
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Live Client Projects
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-8"></div>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                            Real-world applications and professional websites currently deployed and serving users in production environments.
                        </p>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {liveProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -5 }}
                                className="glass dark:glass-dark rounded-3xl p-6 border-white/20 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all group flex flex-col h-full bg-white/40 dark:bg-slate-800/40"
                            >
                                <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <FaGlobe size={24} />
                                </div>
                                
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                                    {project.title}
                                </h4>
                                
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 font-medium leading-relaxed">
                                    {project.description}
                                </p>
                                
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors mt-auto"
                                >
                                    Visit Site <FaExternalLinkAlt />
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default LiveProjects;
