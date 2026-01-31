import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode } from "react-icons/fa";

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
    return (
        <section id="projects" className="py-20 bg-slate-900/50 relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Featured Projects
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                        <p className="mt-4 text-slate-400 text-center max-w-2xl">
                            Here are some of my recent open source projects. Each one is a unique solution to a real-world problem.
                        </p>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -10 }}
                                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all group flex flex-col h-full"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="p-2 bg-slate-900/80 rounded-full backdrop-blur-sm text-cyan-400">
                                            <FaCode />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 mb-4 text-sm flex-1 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-cyan-300 border border-slate-600/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-white bg-slate-700 hover:bg-cyan-600 px-4 py-2 rounded-lg transition-colors w-full justify-center"
                                        >
                                            <FaGithub /> View Code
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-16 text-center">
                        <a
                            href="https://github.com/chinnadurai25"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-all group"
                        >
                            <FaGithub className="text-xl group-hover:rotate-12 transition-transform" /> View More on GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
