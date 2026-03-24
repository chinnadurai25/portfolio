import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaCalendarAlt } from "react-icons/fa";
import CertificateModal from "./CertificateModal";

const certifications = [
    {
        title: "Microsoft Certified: Azure Fundamentals",
        issuer: "Microsoft",
        date: "June 17, 2025",
        image: "/images/certificates/azure-fundamentals.jpg",
    },
    {
        title: "Java Tools",
        issuer: "Infosys Springboard",
        date: "March 21, 2024",
        image: "/images/certificates/java-tools.jpg",
    },
    {
        title: "Data Structures and Algorithms using Python - Part 2",
        issuer: "Infosys Springboard",
        date: "April 12, 2024",
        image: "/images/certificates/dsa-python.jpg",
    },
    {
        title: "Design Thinking",
        issuer: "Infosys Springboard",
        date: "March 23, 2024",
        image: "/images/certificates/design-thinking.jpg",
    },
    {
        title: "Virtual Internship in Networking",
        issuer: "Cisco Networking Academy",
        date: "May - July 2024",
        image: "/images/certificates/cisco-networking.jpg",
    },
    {
        title: "Mobile App Development Internship",
        issuer: "Brassy Technologies",
        date: "27-04-2024 - 10-06-2024",
        image: "/images/certificates/mobile-app-dev.png",
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-20 text-center"
                >
                    <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                        Achievements
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Certifications
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-8"></div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-light">
                        My collection of academic milestones and professional certifications earned along my career journey.
                    </p>
                </motion.div>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            className="glass dark:glass-dark rounded-[2.5rem] overflow-hidden border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group flex flex-col p-4 cursor-pointer active:scale-95"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <div className="aspect-[4/3] overflow-hidden relative rounded-[2rem] bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30">
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-all duration-500 flex items-center justify-center z-20">
                                    <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 text-white font-black text-xs uppercase tracking-widest">
                                        View Certificate
                                    </div>
                                </div>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                />
                            </div>

                            <div className="p-6 flex-1 flex flex-col pt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                        <FaAward className="text-cyan-600 dark:text-cyan-400" size={12} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{cert.issuer}</span>
                                </div>
                                
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight tracking-tight min-h-[3.5rem]">
                                    {cert.title}
                                </h3>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                                        <FaCalendarAlt className="mr-2 text-cyan-500" />
                                        <span>{cert.date}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center border border-slate-200 dark:border-slate-700/50 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-colors duration-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-white transition-colors duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <CertificateModal 
                certificate={selectedCert} 
                onClose={() => setSelectedCert(null)} 
            />
        </section>
    );
};

export default Certifications;
