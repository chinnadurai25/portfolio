import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative py-20 overflow-hidden border-t border-slate-100/50 dark:border-slate-800/50 glass dark:glass-dark">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">
                            CHINNA<span className="text-cyan-500">.</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium max-w-xs leading-relaxed uppercase tracking-widest text-[10px]">
                            Crafting digital experiences with precision and passion.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Social Connect</h4>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaGithub />, link: "https://github.com/chinnadurai25", label: "GitHub" },
                                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/r-chinnadurai/", label: "LinkedIn" },
                                { icon: <FaTwitter />, link: "#", label: "Twitter" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 group"
                                    aria-label={social.label}
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform duration-500">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
                        Made with <FaHeart className="text-cyan-500 animate-pulse" /> by Chinna durai
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        &copy; {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
