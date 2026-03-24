import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="fixed bottom-10 right-10 z-50"
                >
                    <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <button
                        onClick={scrollToTop}
                        className="relative group p-5 glass dark:glass-dark rounded-[1.5rem] shadow-2xl border-white/20 dark:border-slate-700/50 text-cyan-600 dark:text-cyan-400 hover:text-white hover:bg-gradient-to-br from-cyan-500 to-blue-600 hover:border-cyan-500 transition-all duration-500"
                        aria-label="Scroll to top"
                    >
                        <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-[1.5rem] opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-500"></div>
                        <FaArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-500" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
