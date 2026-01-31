import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaCalendarAlt, FaBuilding } from "react-icons/fa";

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
    return (
        <section id="certifications" className="py-20 bg-slate-900 relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Certifications & Achievements
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    <p className="mt-4 text-slate-400 text-center max-w-2xl">
                        Continuous learning is key. Here are some of the certifications and internships I've completed.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all group flex flex-col pt-2"
                        >
                            <div className="h-56 overflow-hidden relative mx-2 rounded-t-lg bg-slate-700/30">
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 flex items-center justify-center z-20">
                                    <FaAward className="text-4xl text-cyan-400 drop-shadow-lg transform scale-0 group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                                </div>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-contain p-2 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                                    {cert.title}
                                </h3>

                                <div className="mt-auto space-y-2">
                                    <div className="flex items-center text-slate-400 text-sm">
                                        <FaBuilding className="mr-2 text-cyan-500/70" />
                                        <span>{cert.issuer}</span>
                                    </div>
                                    <div className="flex items-center text-slate-500 text-xs">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
