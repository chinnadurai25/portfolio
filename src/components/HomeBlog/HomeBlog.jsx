import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';

const HomeBlog = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestArticles = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);
                
                if (error) throw error;
                if (data) setArticles(data);
            } catch (error) {
                console.error("Error fetching latest articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestArticles();
    }, []);

    if (loading || articles.length === 0) return null;

    return (
        <section id="blog" className="py-20 md:py-32 relative z-10">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                        Writings
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                        Latest Articles
                    </h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={`/blog/${article.id}`} className="block h-full group">
                                <div className="glass dark:glass-dark rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-slate-700/50 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all h-full flex flex-col">
                                    {article.cover_image && (
                                        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-4">
                                            <img src={article.cover_image} alt={article.title} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-1">
                                        <p className="text-xs text-cyan-500 font-bold tracking-widest uppercase mb-3">
                                            {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-1">
                                            {article.content.replace(/#+\s/g, '').slice(0, 100)}...
                                        </p>
                                        <div className="flex items-center text-cyan-500 font-bold text-xs uppercase tracking-widest mt-auto">
                                            Read Article
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                        View All Articles
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeBlog;
