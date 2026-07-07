import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                if (data) setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-cyan-500/[0.03] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-blue-500/[0.03] rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 tracking-[0.3em] uppercase mb-4">
                        Writings
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                        Blog & Articles
                    </h1>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-8"></div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-light max-w-2xl mx-auto">
                        Thoughts on software development, tech stacks, and my journey as a full stack developer.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading articles...</div>
                ) : articles.length === 0 ? (
                    <div className="glass dark:glass-dark p-20 rounded-[3rem] text-center">
                        <p className="text-xl text-slate-400 font-light">No articles published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/blog/${article.id}`} className="block h-full group">
                                    <div className="glass dark:glass-dark rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-slate-700/50 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all h-full flex flex-col">
                                        {article.cover_image && (
                                            <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-4">
                                                <img src={article.cover_image} alt={article.title} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        )}
                                        <div className="p-8 flex flex-col flex-1">
                                            <p className="text-xs text-cyan-500 font-bold tracking-widest uppercase mb-3">
                                                {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-1">
                                                {article.content.replace(/#+\s/g, '').slice(0, 150)}...
                                            </p>
                                            <div className="flex items-center text-cyan-500 font-bold text-sm uppercase tracking-widest">
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
                )}
            </div>
        </div>
    );
};

export default BlogList;
