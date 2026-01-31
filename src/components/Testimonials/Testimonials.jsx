import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
    {
        name: "John Doe",
        role: "Project Manager",
        company: "Tech Solutions Inc.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "Chinnadurai is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are impressive.",
        rating: 5
    },
    {
        name: "Jane Smith",
        role: "CTO",
        company: "Creative Agency",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "Working with Chinnadurai was a pleasure. He understood our requirements perfectly and built a scalable and efficient solution for our startup.",
        rating: 5
    },
    {
        name: "Michael Johnson",
        role: "Lead Developer",
        company: "Innovate Corp",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        content: "A highly skilled developer with a strong grasp of modern web technologies. He is a great team player and always eager to learn new things.",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-slate-900/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Client Testimonials
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                    <p className="mt-4 text-slate-400 text-center max-w-2xl">
                        What others say about their experience working with me.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative hover:border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/5"
                        >
                            <FaQuoteLeft className="text-4xl text-slate-700 absolute top-6 right-6 opacity-50" />

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-full border-2 border-cyan-500/50 object-cover"
                                />
                                <div>
                                    <h4 className="text-white font-semibold">{item.name}</h4>
                                    <p className="text-cyan-400 text-xs">{item.role} @ {item.company}</p>
                                </div>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-sm mb-6 relative z-10">
                                "{item.content}"
                            </p>

                            <div className="flex gap-1">
                                {[...Array(item.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-500 text-sm" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
