import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaAward, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

const CertificateModal = ({ certificate, onClose }) => {
    if (!certificate) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-xl p-4 md:p-8"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass dark:glass-dark rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative border-white/20 dark:border-slate-700/50 flex flex-col md:flex-row"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-4 bg-white/10 dark:bg-slate-800/50 hover:bg-red-500/80 rounded-2xl text-slate-300 hover:text-white transition-all z-50 backdrop-blur-md border border-white/10 active:scale-95"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="md:w-3/5 bg-slate-100/50 dark:bg-slate-900/50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-800/50">
                        <div className="relative group/image w-full h-full flex items-center justify-center">
                            <div className="absolute -inset-4 bg-cyan-500/10 rounded-3xl blur-2xl opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
                            <img
                                src={certificate.image}
                                alt={certificate.title}
                                className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800 transform transition-transform group-hover/image:scale-[1.02]"
                            />
                        </div>
                    </div>

                    <div className="md:w-2/5 p-10 flex flex-col overflow-y-auto custom-scrollbar">
                        <div className="inline-flex items-center gap-3 text-cyan-500 dark:text-cyan-400 mb-6 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/10 self-start">
                            <FaAward />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Verified Achievement</span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                            {certificate.title}
                        </h3>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 transition-all hover:border-cyan-500/30 group/item">
                                <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover/item:scale-110 transition-transform">
                                    <FaBuilding size={20} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Issued By</span>
                                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{certificate.issuer}</h4>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 transition-all hover:border-blue-500/30 group/item">
                                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                                    <FaCalendarAlt size={20} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Issue Date</span>
                                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{certificate.date}</h4>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CertificateModal;
