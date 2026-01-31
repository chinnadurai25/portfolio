import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com'; // Ensure emailjs-com is installed as per package.json
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Note: You would typically replace these with your actual EmailJS IDs
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')

        // Simulating success for now
        setTimeout(() => {
            setStatus('success');
            e.target.reset();
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-slate-900/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Get In Touch
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Let's Talk</h3>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                I'm currently available for freelance work or full-time opportunities.
                                If you have a project that needs some creative touch, or just want to say hi,
                                my inbox is always open.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 text-slate-300">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">Email</h4>
                                        <p className="text-sm">rchinna@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 text-slate-300">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                                        <FaPhone />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">Phone</h4>
                                        <p className="text-sm">+91 9600989735</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 text-slate-300">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">Location</h4>
                                        <p className="text-sm">Thoothukudi, Tamilnadu</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-200 placeholder-slate-500 transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Your Email"
                                    required
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-200 placeholder-slate-500 transition-colors"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder="Your Message"
                                    required
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-200 placeholder-slate-500 transition-colors resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
