import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import ProjectModal from "./ProjectModal";

const projects = [
    {
        title: "Payroll Management System",
        description: "A comprehensive payroll system built with React to manage employee salaries, tax calculations, and pay slips efficiently.",
        tags: ["React", "JavaScript", "CSS"],
        github: "https://github.com/chinnadurai25/payroll-using-react",
        live: "#",
        image: "/images/payroll.png"
    },
    {
        title: "Hotel Billing App",
        description: "A mobile-first hotel billing solution using React Native for seamless guest checkout and invoicing.",
        tags: ["React Native", "JavaScript", "Mobile"],
        github: "https://github.com/chinnadurai25/hotelbilling-using-reactnative",
        live: "#",
        image: "/images/hotel.png"
    },
    {
        title: "Agri-Connect (Farmer Help)",
        description: "An app designed to assist farmers with crop information, market prices, and expert advice using React Native.",
        tags: ["React Native", "Mobile", "Agriculture"],
        github: "https://github.com/chinnadurai25/Farmer-help",
        live: "#",
        image: "/images/farmer.png"
    },
    {
        title: "Online Shop Web App",
        description: "A fully functional e-commerce web application featuring product listings, shopping cart, and checkout flow.",
        tags: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/chinnadurai25/online-shop-in-web-application",
        live: "#",
        image: "/images/shop.png"
    },
    {
        title: "Hospital Management",
        description: "A robust hospital management system built with Django for handling patient records, appointments, and doctors.",
        tags: ["Django", "Python", "HTML"],
        github: "https://github.com/chinnadurai25/Chinnadurai",
        live: "#",
        image: "/images/hospital.png"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                            Portfolio
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Featured Projects
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                            A curated selection of my recent work, ranging from complex web systems to intuitive mobile applications.
                        </p>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -12 }}
                                className="glass dark:glass-dark rounded-[2.5rem] overflow-hidden border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group flex flex-col h-full cursor-pointer p-3"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="h-64 overflow-hidden relative rounded-[2rem]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                        <div className="flex gap-2">
                                            {project.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase tracking-widest font-bold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm flex-1 leading-relaxed font-medium">
                                        {project.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                        <div className="flex gap-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-cyan-500 dark:hover:bg-cyan-500 shadow-lg shadow-slate-900/10 transition-all transform hover:scale-110"
                                                onClick={(e) => e.stopPropagation()}
                                                title="View Source Code"
                                            >
                                                <FaGithub size={18} />
                                            </a>
                                        </div>
                                        <button className="text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 group/btn">
                                            Details <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center group-hover/btn:bg-cyan-500 group-hover/btn:text-white transition-all"><FaArrowRight className="text-[10px]" /></div>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-20 text-center">
                        <a
                            href="https://github.com/chinnadurai25"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-white transition-all transform hover:-translate-y-1"
                        >
                            <FaGithub className="text-xl" /> Explorer More Works
                        </a>
                    </div>
                </motion.div>
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
