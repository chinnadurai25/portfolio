import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLayerGroup } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-red-500/80 rounded-full text-slate-300 hover:text-white transition-all z-10"
                    >
                        <FaTimes />
                    </button>

                    <div className="relative h-64 md:h-80 w-full">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:left-10">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{project.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-3">Project Overview</h4>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        {project.description}
                                    </p>
                                    <p className="text-slate-400 mt-4 leading-relaxed">
                                        This project demonstrates advanced concepts and provides a practical solution.
                                        It features a responsive design, interactive UI elements, and a robust architecture.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                                        <FaLayerGroup className="text-cyan-400" /> Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                                <span className="text-slate-200">{tag}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
                                    <h4 className="text-lg font-semibold text-white mb-4">Project Links</h4>
                                    <div className="space-y-3">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors border border-slate-600"
                                        >
                                            <FaGithub className="text-xl" />
                                            <span className="font-medium">View Code</span>
                                        </a>
                                        {project.live && project.live !== "#" && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 w-full p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
                                            >
                                                <FaExternalLinkAlt />
                                                <span className="font-medium">Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
