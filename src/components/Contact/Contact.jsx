import React, { useRef, useState } from 'react';
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(form.current);
        formData.append("access_key", "d9e52b79-441f-461a-950e-f59c83afc821");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                form.current.reset();
                setTimeout(() => setStatus(''), 5000);
            } else {
                console.log("Error", data);
                setStatus('error');
                setTimeout(() => setStatus(''), 5000);
            }
        } catch (error) {
            console.log("Error", error);
            setStatus('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-20 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                            Connect
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Get In Touch
                        </h3>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight italic">Let's Talk!</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg font-medium">
                                    I'm currently available for freelance work or full-time opportunities.
                                    If you have a project that needs some creative touch, or just want to say hi,
                                    my inbox is always open.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <motion.a
                                    href="mailto:rchinna@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-6 p-6 glass dark:glass-dark rounded-[2rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group"
                                    whileHover={{ x: 10 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email</h4>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">rchinna@gmail.com</p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="tel:+919600989735"
                                    className="flex items-center space-x-6 p-6 glass dark:glass-dark rounded-[2rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group"
                                    whileHover={{ x: 10 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                        <FaPhone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Phone</h4>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">+91 9600989735</p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="https://www.google.com/maps/search/?api=1&query=Thoothukudi,Tamilnadu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-6 p-6 glass dark:glass-dark rounded-[2rem] border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group"
                                    whileHover={{ x: 10 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Location</h4>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Thoothukudi, Tamilnadu</p>
                                    </div>
                                </motion.a>
                            </div>
                        </div>

                        <form ref={form} onSubmit={sendEmail} className="space-y-6 glass dark:glass-dark p-10 rounded-[3rem] border-white/20 dark:border-slate-700/50 shadow-2xl shadow-cyan-500/5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">FullName</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 transition-all focus:ring-4 focus:ring-cyan-500/10 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 transition-all focus:ring-4 focus:ring-cyan-500/10 font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-slate-400">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder="How can I help you?"
                                    required
                                    className="w-full px-6 py-4 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 transition-all resize-none focus:ring-4 focus:ring-cyan-500/10 font-medium"
                                ></textarea>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                            >
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
