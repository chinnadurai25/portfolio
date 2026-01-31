import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            PORTFOLIO
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">
                            Turning ideas into reality through code.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://github.com/chinnadurai25" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-xl">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/r-chinnadurai/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-xl">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors text-xl">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    <p className="flex items-center justify-center gap-1">
                        Made with <FaHeart className="text-red-500" /> by Chinna durai &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
