import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    const navLinks = [
        { name: "About", to: "about" },
        { name: "Skills", to: "skills" },
        { name: "Projects", to: "projects" },
        { name: "Experience", to: "experience" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
                scrolled ? "pt-4 px-4" : "pt-0 px-0"
            }`}
        >
            <div 
                className={`flex items-center justify-between transition-all duration-500 px-6 sm:px-10 ${
                    scrolled 
                        ? "glass dark:glass-dark rounded-full py-3 w-full max-w-5xl shadow-2xl shadow-cyan-500/10" 
                        : "bg-transparent py-8 w-full max-w-7xl"
                }`}
            >
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent tracking-tighter italic">
                            CHINNA<span className="text-cyan-500">.</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={`#${link.to}`}
                            className="relative px-5 py-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 text-sm font-black uppercase tracking-[0.2em] group/link"
                        >
                            <span className="relative z-10">{link.name}</span>
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover/link:w-2/3"></span>
                        </a>
                    ))}
                    
                    <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-4"></div>
                    
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-500 focus:outline-none group active:scale-90 border border-transparent hover:border-cyan-500/30 shadow-inner"
                    >
                        {theme === 'dark' ? (
                            <FaSun className="text-yellow-400 w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                        ) : (
                            <FaMoon className="text-slate-600 w-5 h-5 group-hover:-rotate-45 transition-transform duration-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 transition-colors focus:outline-none border border-slate-200 dark:border-slate-700"
                    >
                        {theme === 'dark' ? (
                            <FaSun className="text-yellow-400 w-5 h-5" />
                        ) : (
                            <FaMoon className="text-slate-600 w-5 h-5" />
                        )}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none border border-slate-200 dark:border-slate-700 active:scale-90"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-4 right-4 mt-4"
                    >
                        <div className="glass dark:glass-dark rounded-[2.5rem] p-8 shadow-2xl border-white/20 dark:border-slate-700/50">
                            <div className="flex flex-col space-y-4">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={link.name}
                                        href={`#${link.to}`}
                                        className="px-6 py-4 text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-all font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-50 dark:hover:bg-cyan-900/30 border border-transparent hover:border-cyan-500/10 text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
